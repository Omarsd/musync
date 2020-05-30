import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  private uid: string;

  private usuario: Usuario = {
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

  constructor(private AFauth: AngularFireAuth, 
    private usuarioServ: UsuarioService,
    private router : Router ) { }

  ngOnInit() {

    this.AFauth.auth.onAuthStateChanged(
			user => {
			  if (user) {
          // User is signed in.
          this.uid = user.uid
          
          this.usuarioServ.getUsuario(this.uid).subscribe(
            data => {
              this.usuario = data;	
              console.log(this.usuario)
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

}
