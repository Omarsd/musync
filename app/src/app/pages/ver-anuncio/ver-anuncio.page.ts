import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/model/Anuncio';
import { Usuario } from 'src/app/model/usuario';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AnunciosService } from 'src/app/services/anuncio.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { ActualizarAnuncioComponent } from "../../components/actualizar-anuncio/actualizar-anuncio.component";
import { ModalController } from "@ionic/angular";


@Component({
	selector: 'app-ver-anuncio',
	templateUrl: './ver-anuncio.page.html',
	styleUrls: ['./ver-anuncio.page.scss'],
})

export class VerAnuncioPage implements OnInit {

	usuario: Usuario = {
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

	anuncio: Anuncio = {
		id: '',
		idMusico: '',
		titulo: '',
		descripcion: '',
		createdAt: '',
		fechaEvento: null,
		ubicacion: '',
		instrumento: '',
		tipoDemanda: null,
	}

	rate: number = 3;
	owned: boolean;
	uid: string;
	nombreUsuario: string
	rol: string;

	constructor(
		private activatedRoute: ActivatedRoute,
		private anunciosService: AnunciosService,
		private router: Router,
		private AFauth: AngularFireAuth,
		private modal: ModalController,
		private usuarioService: UsuarioService,
	) { }

	ngOnInit() {
		this.AFauth.auth.onAuthStateChanged(
			user => {
				if (user) {
					// User is signed in.
					this.uid = user.uid
					this.usuarioService.getUsuario(user.uid).subscribe(
						data => {
							this.rol = data.rol;
							this.nombreUsuario = data.nombreCompleto
						}
					);
				}
				else {
					// No user is signed in.
					console.log("el usuario no ha iniciado sesion.");
				}
			}
		);

		const id = this.activatedRoute.snapshot.paramMap.get('id');
		if (id) {
			this.anunciosService.getAnuncio(id).subscribe(
				data => {
					if (data) {		// Si data tiene un valor valido
						this.anuncio = data;
						this.anuncio.id = id;
						
						if (data.idMusico == this.uid) {
							this.owned = true
						}
						else {
							this.owned = false
						}

						this.usuarioService.getUsuario(this.anuncio.idMusico).subscribe(
							data => {
								this.usuario = data;
							},
							err => {
								console.log('Usuario del Anuncio no encontrado: ', err)
							}
						);

					}
					else{		// Si data no tiene un valor valido. Ej: undefined, null...
						console.log('Anuncio no encontrado: ')
						this.router.navigate(['/no-encontrado'])
					}
				},
				err => {
					console.log('Error en la consulta del anuncio: ', err)
					this.router.navigate(['/no-encontrado'])
				}
			);

		}

	}

	ngAfterViewInit(): void {
	}

	eliminarAnuncio() {
		this.anunciosService.alertConfirmarEliminar(this.anuncio.id)
	}
	
	actualizarAnuncio() {
		this.modal.create({
			component: ActualizarAnuncioComponent,
			componentProps: {
				anuncio: this.anuncio,
				owned: this.owned,
				uid: this.uid
			}
		}).then((modal) => modal.present())
	}

	logRatingChange(rating) {
		console.log("changed rating: ", rating);
		// do your stuff
	}

	enviarMensaje() {
		let datos = {
			idAnuncio: this.anuncio.id,
			nombreAnuncio: this.anuncio.titulo,
			idReceptor: this.anuncio.idMusico,
			nombreReceptor: this.usuario.nombreCompleto,
			idEmisor: this.uid,
			nombreEmisor: this.nombreUsuario
		}
		let navigationExtras: NavigationExtras = {
			state: {
				datos: datos
			}
		};

		console.log(navigationExtras.state)
		this.router.navigate(['/mensajes'], navigationExtras);

	}

}
