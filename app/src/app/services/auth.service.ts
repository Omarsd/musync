import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from "@angular/fire/auth";
import { Usuario } from '../model/usuario';
import { UsuarioService } from './usuario.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

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

	getUser() : Usuario {
		var usuario: Usuario = {
			id: '',
			nick : '',
			nombreCompleto: '',
			email: '',
			cp: '',
			rol: '',
			baneado: '',
			fechaBaneo: null,
			fechaDesbaneo: null
		}

		var uid:string

		this.AFauth.auth.onAuthStateChanged(
			function (user) {
				if (user) {
					// User is signed in.
					uid = user.uid;
					console.log(uid)
					console.log("1");
					console.log(usuario);
					console.log(user);
					return this.usuarioService.getUsuario(uid).subscribe(
						user => {
							usuario = user
							console.log("2");
							console.log(usuario);
						}
					)
				}
				else {
					// No user is signed in.
					console.log("el usuario no ha iniciado sesion.");
				}
			}
		);
		
		
		return usuario;
	}
	
}