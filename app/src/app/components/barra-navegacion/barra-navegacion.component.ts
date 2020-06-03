import { Component } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UsuarioService } from "../../services/usuario.service";
import { AuthService } from "../../services/auth.service";
import { FirebaseService } from '../../services/anuncio.service';
import { isNullOrUndefined } from 'util';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from "@angular/router";

@Component({
	selector: 'app-barra-navegacion',
	templateUrl: './barra-navegacion.component.html',
	styleUrls: ['./barra-navegacion.component.scss'],
})
export class BarraNavegacionComponent {
	navigate: any;

	uid: String;
	usuario: Usuario = {
		nick: 'perfil',
		nombreCompleto: '',
		email: '',
		cp: '',
		descripcion: '',
		rol: '',
		baneado: '',
		fechaBaneo: null,
		fechaDesbaneo: null
	}
	logedout: boolean

	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private userService: UsuarioService,
		private fbService: FirebaseService,
		private authservice: AuthService,
		private AFauth: AngularFireAuth,
		private router: Router
	) {
		this.sideMenu();
		this.initializeApp();

		//Si esta logueado, pone logedout a false. esto cambia los botones "registrarse", "login" y "logout"
		if (this.authservice.isAuthenticated) {
			this.logedout = false
		}
		else {
			this.logedout = true
		}

		this.AFauth.authState.subscribe(auth => {
			if (isNullOrUndefined(auth)) {
				this.logedout = true
			}
			else {
				this.uid = auth.uid
				this.logedout = false
				// Obtener usuario
				/* this.usuario = this.authservice.usuario
				console.log(this.usuario) */
				this.userService.getUsuario(auth.uid).subscribe(
					data => {
						this.usuario = data;
						console.log(this.usuario.rol)
					}
				);
			}
		})
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}

	sideMenu() {
		this.navigate = [
			{
				title: "Menú",
				url: "/home",
				icon: "home"
			},
			{
				title: "Mensajes",
				url: "/mensajes",
				icon: "chatboxes"
			},
			{
				title: "Sobre nosotros",
				url: "/about",
				icon: "people"
			},
		]
	}

	logout() {
		this.authservice.logout()
		this.logedout = true
		this.usuario = {
			nick: '',
			nombreCompleto: '',
			email: '',
			cp: '',
			descripcion: '',
			rol: '',
			baneado: '',
			fechaBaneo: null,
			fechaDesbaneo: null
		}
	}


}
