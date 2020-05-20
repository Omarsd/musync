import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/model/Anuncio';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/anuncio.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-crear-anuncio',
  templateUrl: './crear-anuncio.page.html',
  styleUrls: ['./crear-anuncio.page.scss'],
})
export class CrearAnuncioPage implements OnInit {

  anuncio: Anuncio = {
    titulo: '',
    descripcion: '',
    createdAt: new Date().getTime()
  };

  constructor(
      private activatedRoute: ActivatedRoute,
      private fbService: FirebaseService,
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
