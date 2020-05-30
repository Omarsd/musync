import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajeriaService } from 'src/app/services/mensajeria.service';
import { Conversacion } from 'src/app/model/conversacion';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.page.html',
  styleUrls: ['./mensajes.page.scss'],
})
export class MensajesPage implements OnInit {

  datos: any
  conversacion: Conversacion = {

    idAnuncio: '',
    idEmisor: '',
    idReceptor: '',
    mensajes: null
  }
  constructor(private route:ActivatedRoute,
    private router: Router, 
    private mensajeriaServ: MensajeriaService) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.datos = this.router.getCurrentNavigation().extras.state.datos;
        this.conversacion.idAnuncio = this.datos.idAnuncio
        this.conversacion.idEmisor = this.datos.idEmisor
        this.conversacion.idReceptor = this.datos.idReceptor
        this.mensajeriaServ.addConversacion(this.conversacion)
      }
    });
  }

  ngOnInit() {

    

  }

}
