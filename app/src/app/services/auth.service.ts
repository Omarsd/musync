import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app"
import { Usuario } from '../model/usuario';
import { UsuarioService } from './usuario.service';
import { AlertController } from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	usuario: Usuario = {
		nick: '',
		nombreCompleto: '',
		email: '',
		cp: '',
		descripcion: '',
		imagenPerfil: '',
		rol: 'musico',
		baneado: '0',
		fechaBaneo: null,
		fechaDesbaneo: null
	  };

	constructor(private router: Router,
				private AFauth: AngularFireAuth,
				private usuarioService: UsuarioService,
				private alertController: AlertController) {}

	//El login lo controlamos aqui. Lo hace diferente. Me he copiado de este video https://www.youtube.com/watch?v=frm49cIPp_0
	//Ya pondremos los errores que vayan saliendo

	login(email: string, password: string) {
		return new Promise((resolve, rejected) => {
			this.AFauth.auth.signInWithEmailAndPassword(email, password).then(user => {
				resolve(user);
				this.router.navigate(['/home'])
			}).catch(err => rejected(err))
		})
	}

	loginGoogle(){
		return new Promise((resolve, rejected) => {
			this.AFauth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
			.then(user => {
				resolve(user);
				console.log(user)

				if(user.additionalUserInfo.isNewUser){
					this.usuario.nombreCompleto = user.user.displayName;
					this.usuario.email = user.user.email;
					this.usuario.nick = user.user.uid;
					this.usuario.imagenPerfil = user.user.photoURL;
					
					this.usuarioService.addUsuario(this.usuario, user.user.uid)
				}

				this.router.navigate(['/home'])
			})
			.catch(err => {
				rejected(err)
			})
		})
	
	
		/* try{
		const user = this.AFauth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
		console.log(user.)
		this.router.navigate(['/home'])
	} catch (err) {
		console.log(err)
		if(err.code == "auth/web-storage-unsupported"){
		  console.log("error ya sabes navegador")
			//this.presentAlert("Error navegador", "Este navegador no permite guardar cookies de terceros")
		}
	  } */
		
	}

	logout() {
		this.AFauth.auth.signOut()
		this.router.navigate(['/home']);
	}

	isAuthenticated() {
		this.AFauth.authState.subscribe(auth => {
			if (isNullOrUndefined(auth)) {
				return false
			} else {
				return true
			}
		})
	}


// Inicio Eliminar Perfil

	async alertConfirmarEliminar() {
		console.log('¿Eliminar usuario?');
		const alert = await this.alertController.create({
			header: 'Eliminar usuario.',
			message: 'Esta acción será <strong>insalvable</strong>.',
			buttons: [
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'secondary',
					handler: () => {
						console.log('El usuario no se ha eliminado');
					}
				}, {
					text: 'Eliminar',
					handler: () => {
						console.log('El usuario será eliminado');
						this.eliminarPerfil()
					}
				}
			]
		});
		await alert.present();
	}

	eliminarPerfil() {
		console.log('El usuario será eliminado');
		var uid = this.AFauth.auth.currentUser.uid
		this.AFauth.auth.currentUser.delete()
			.then(() => {
				// Usuario eliminado.
				this.usuarioService.deleteUsuario(uid)
					.then( () => {
						console.log('Usuario completamente eliminado de la base de datos.');
					})
					.catch( err => {
						console.log('err. ', err);
					});
				console.log('Usuario eliminado.');
			})
			.catch(error => {
				// Error al eliminar.
				console.log('error', error)
				if(error.code == "auth/requires-recent-login"){
					this.alertReiniciarSesion()
				}
			});
	}

	async alertReiniciarSesion() {
		console.log('Necesario reinicar sesion');
		const alert = await this.alertController.create({
			header: 'Necesario iniciar sesion de nuevo.',
			subHeader: 'Cierra tu sesion.',
			message: 'Por temas de seguiridad, el sistema necesita que <strong>inicies sesión de nuevo</strong> para <strong>eliminar tu cuenta</strong>.',
			buttons: ['OK']
		});
		await alert.present();
	}

// Fin Eliminar Perfil
}
