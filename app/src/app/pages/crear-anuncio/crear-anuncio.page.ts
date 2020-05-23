import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/model/Anuncio';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/anuncio.service';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

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
	intrumeto: '',
	tipoDemanda: null,
	ubicacion: ''
  };

  constructor(
      private activatedRoute: ActivatedRoute,
	  private fbService: FirebaseService,
	  private authService: AuthService,
      private toastCtrl: ToastController,
      private router: Router
  ) { }

  ngOnInit() {
  }

  addAnuncio() {
    this.fbService.addAnuncio(this.anuncio).then(() => {
      this.router.navigateByUrl('/');
    }, err => {
    });
  }

}
