import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/model/Anuncio';
import { Router } from '@angular/router';
import { AnunciosService } from 'src/app/services/anuncio.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';

@Component({
	selector: 'app-crear-anuncio',
	templateUrl: './crear-anuncio.page.html',
	styleUrls: ['./crear-anuncio.page.scss'],
})
export class CrearAnuncioPage implements OnInit {

	today: Date = new Date();

	anuncio: Anuncio = {
		idMusico: '',
		titulo: '',
		descripcion: '',
		createdAt: new Date().getTime(),
		fechaEvento: null,
		instrumento: '',
		tipoDemanda: null,
		ubicacion: ''
	};

	constructor(
		private anunciosService: AnunciosService,
		private AFauth: AngularFireAuth,
		private router: Router,
		private alertController: AlertController
	) {
	}

	ngOnInit() {
		this.AFauth.auth.onAuthStateChanged(
			user => {
				if (user) {
					// User is signed in.
					this.anuncio.idMusico = user.uid
					console.log(this.anuncio)
				}
				else {
					// No user is signed in.
					console.log("el usuario no ha iniciado sesion.");
				}
			}
		);
	}

	async presentAlert(header: string, message: string) {
		const alert = await this.alertController.create({
			header: header,
			message: message,
			buttons: ['OK']
		});

		await alert.present();
	}

	addAnuncio() {

		var error: string = ''

		if (this.anuncio.titulo == '') {
			error += "titulo"

		}
		if (this.anuncio.descripcion == '') {
			if (error == '') {
				error += "descripcion"
			} else {
				error += ", descripcion"
			}
		}
		if (this.anuncio.fechaEvento == null) {
			if (error == '') {
				error += "fecha"
			} else {
				error += ", fecha"
			}
		}
		if (this.anuncio.instrumento == '') {
			if (error == '') {
				error += "instrumento"
			} else {
				error += ", instrumento"
			}
		}
		if (this.anuncio.tipoDemanda == null) {
			if (error == '') {
				error += "demanda u oferta"
			} else {
				error += ", demanda u oferta"
			}
		}

		if (this.anuncio.ubicacion == '') {
			if (error == '') {
				error += "ubicacion"
			} else {
				error += ", ubicacion"
			}
		}

		if (error != '') {
			console.log(error)
			this.presentAlert("Faltan datos!", "Asegurese de rellenar correctamente: " + error)
		} else {
			this.anunciosService.addAnuncio(this.anuncio).then(
				() => {
					this.router.navigateByUrl('/');
				},
				err => {
					console.log(err)
				}
			);
		}
	}
}
