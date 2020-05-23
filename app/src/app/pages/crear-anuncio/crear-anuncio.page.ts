import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/model/Anuncio';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/anuncio.service';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-crear-anuncio',
  templateUrl: './crear-anuncio.page.html',
  styleUrls: ['./crear-anuncio.page.scss'],
})
export class CrearAnuncioPage implements OnInit {

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
	  private fbService: FirebaseService,
	  private AFauth: AngularFireAuth,
      private router: Router
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

  addAnuncio() {
    this.fbService.addAnuncio(this.anuncio).then(() => {
      this.router.navigateByUrl('/');
    }, err => {
    });
  }

}
