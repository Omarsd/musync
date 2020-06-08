import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	// Inicializamos variables
	email: string = ""
	password: string = ""

	//Cargamos el objeto de la clase AngularFireAuth para la autenticacion
	constructor(public auth: AngularFireAuth,
		public alertController: AlertController,
		public router: Router,
		public AFauth: AuthService) { }

	ngOnInit() {
	}

	async presentAlert(header: string, message: string) {
		const alert = await this.alertController.create({
			header: header,
			message: message,
			buttons: ['OK']
		});

		await alert.present();
	}

	async login() {
		if(this.password == ''){
			this.presentAlert("Contraseña vacía", "Por favor, ingrese una contraseña")
		} else{
			this.AFauth.login(this.email, this.password)
		}
		
	}

	loginGoogle() {
		try {
			this.AFauth.loginGoogle()
		} catch (err) {
			if (err.code == "auth/web-storage-unsupported") {
				this.presentAlert("Error navegador", "Este navegador no permite guardar cookies de terceros")
			}
		}

	}

}
