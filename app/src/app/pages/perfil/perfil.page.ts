import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from "@ionic/angular";
import { AnunciosService } from 'src/app/services/anuncio.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActualizarPerfilComponent } from "../../components/actualizar-perfil/actualizar-perfil.component";
import { Usuario } from 'src/app/model/usuario';
import { Anuncio } from 'src/app/model/Anuncio';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-perfil',
	templateUrl: './perfil.page.html',
	styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
	today: Date = new Date()
	uid: string;
	owned: Boolean;

	usuarioPerfil: Usuario = {
		id: '',
		nick: '',
		nombreCompleto: '',
		email: '',
		cp: '',
		descripcion: '',
		imagenPerfil: '',
		rol: '',
		baneado: '',
		fechaBaneo: null,
		fechaDesbaneo: null
	}

	anuncios: Anuncio[] = [];
	anunciosDisponibles = 0

	constructor(
		private AFauth: AngularFireAuth,
		private anunciosService: AnunciosService,
		private authServ: AuthService,
		private usuarioServ: UsuarioService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private modal: ModalController,
	) { }

	ngOnInit() {
		this.AFauth.auth.onAuthStateChanged(
			user => {
				if (user) {
					// usuario logeado
					this.uid = user.uid
				}
				else {
					// usuario no logeado
					this.router.navigate(['/login'])
				}
			},
			err => {
				console.log('Error en la consulta del inicio de sesión.', err)
			}
		);
		const id = this.activatedRoute.snapshot.paramMap.get('id');
		if (id) {
			this.usuarioServ.getUsuario(id).subscribe(
				busquedaUsuario => {
					if (busquedaUsuario) {
						console.log('busquedaUsuario', busquedaUsuario)
						// Obtener usuario del perfil
						this.usuarioPerfil = busquedaUsuario;

						// Comprobar si el perfil es el propio
						if (busquedaUsuario.id == this.uid) {
							this.owned = true
						}
						else {
							this.owned = false
						}

						// Obtener los anuncios del musico.
						this.anunciosService.getAnunciosMusico(this.usuarioPerfil.id).get()
							.then(snapshot => {
								// Comprobar si no tiene anuncios creados.
								if (snapshot.empty) {
									console.log('No hay resultados.');
								}
								// Obtener los anuncios en caso de si tener
								else {
									var i = 0;
									snapshot.forEach(doc => {
										var anuncio: Anuncio = {
											id: doc.id,
											createdAt: doc.data().createdAt,
											descripcion: doc.data().descripcion,
											fechaEvento: new Date(doc.data().fechaEvento),
											idMusico: doc.data().idMusico,
											instrumento: doc.data().instrumento,
											tipoDemanda: doc.data().tipoDemanda,
											titulo: doc.data().titulo,
											ubicacion: doc.data().ubicacion
										}
										if (anuncio.fechaEvento >= this.today) this.anunciosDisponibles++;
										this.anuncios[i++] = anuncio;
									});
								}
							})
							// Capturar errores, en caso de haberlos a la hora de obtenerlos.
							.catch(err => {
								console.log('Error al obtener los resultados. ', err);
							});
					}
				},
				// Si no existe el musico al que se ha accedido, mandar a 404
				err => {
					console.log('Error en la consulta del perfil.', err)
					this.router.navigate(['/no-encontrado'])
				}
			);
		}
	}

	ngAfterViewInit(): void {
	}

	esValido(texto: String): Boolean {
		return (texto == null || texto == undefined || texto == '') ? false : true;
	}

	actualizarPerfil() {
		this.modal.create({
			component: ActualizarPerfilComponent,
			componentProps: {
				perfil: this.usuarioPerfil,
				owned: this.owned,
				uid: this.uid
			}
		}).then((modal) => modal.present())
	}
}
