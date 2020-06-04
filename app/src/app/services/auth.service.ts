import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app"
import { Usuario } from '../model/usuario';
import { UsuarioService } from './usuario.service';

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
				private usuarioService: UsuarioService) {}

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
	
}
