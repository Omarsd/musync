import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from "@ionic/angular";
import { FirebaseService } from 'src/app/services/anuncio.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/model/usuario';
import { Anuncio } from 'src/app/model/Anuncio';

@Component({
	selector: 'app-perfil',
	templateUrl: './perfil.page.html',
	styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
	private today: Date= new Date()
	private uid: string;
	private owned: Boolean;

	private usuarioLogeado: Usuario = {
		id: '',
		nick: '',
		nombreCompleto: '',
		email: '',
		cp: '',
		rol: '',
		baneado: '',
		fechaBaneo: null,
		fechaDesbaneo: null
	}

	private usuarioPerfil: Usuario = {
		id: '',
		nick: '',
		nombreCompleto: '',
		email: '',
		cp: '',
		rol: '',
		baneado: '',
		fechaBaneo: null,
		fechaDesbaneo: null
	}

	private hayAnuncios: Boolean;
	private anuncios: Anuncio[] = [];

	constructor(
		private AFauth: AngularFireAuth,
		private fbService: FirebaseService,
		private usuarioServ: UsuarioService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private modal: ModalController,

	) {}

	ngOnInit() {

		this.AFauth.auth.onAuthStateChanged(
			user => {
				if (user) {
					// User is signed in.
					this.uid = user.uid

					this.usuarioServ.getUsuario(this.uid).subscribe(
						busquedaUsuario => {
							this.usuarioLogeado = busquedaUsuario;
							console.log(this.usuarioLogeado)
						}
					);
				}
				else {
					// No user is signed in.
					this.router.navigate(['/home'])
				}
			}
		);
	}

	ngAfterViewInit(): void {
		const id = this.activatedRoute.snapshot.paramMap.get('id');
		if (id) {
			this.usuarioServ.getUsuario(id).subscribe(
				busquedaUsuario => {
					// Obtener usuario del link
					this.usuarioPerfil = busquedaUsuario;
					// Comprobar si es el propio perfil
					if (busquedaUsuario.id == this.uid) {
						this.owned = true
					} else {
						this.owned = false
					}

					// Obtener los anuncios del musico.
					this.fbService.getAnunciosMusico(this.usuarioPerfil.id).get()
						.then(snapshot => {
							// Comprobar si no tiene anuncios creados.
							if (snapshot.empty) {
								console.log('No hay resultados.');
								this.hayAnuncios = false;
							}
							// Obtener los anuncios en caso de si tener
							else {
								this.hayAnuncios = true;
								var i = 0;
								snapshot.forEach(doc => {
									var anuncio : Anuncio = {
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
									this.anuncios[i++] = anuncio;
								});
							}
						})
						// Capturar errores, en caso de haberlos a la hora de obtenerlos.
						.catch(err => {
							console.log('Error al obtener los resultados. ', err);
						});
				},
				// Si no existe el musico al que se ha accedido, mandar a 404
				err => {
					this.router.navigate(['/no-encontrado'])
				}
			);
		}
	}

}
