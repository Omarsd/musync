import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajeriaService } from 'src/app/services/mensajeria.service';
import { Conversacion } from 'src/app/model/conversacion';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Mensaje } from 'src/app/model/mensaje';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.page.html',
  styleUrls: ['./mensajes.page.scss'],
})
export class MensajesPage implements OnInit {

  datos: any
  private uid: string
  private conversaciones: Conversacion[] = [];
  conversacion: Conversacion = {

    idAnuncio: '',
    nombreAnuncio: '',
    idEmisor: '',
    nombreEmisor: '',
    idReceptor: '',
    nombreReceptor: '',
    mensajes: []
  }
  mensaje: Mensaje ={
    emisor: '',
    texto: '',
    fecha: null
  }
  
  constructor(private route:ActivatedRoute,
    private router: Router, 
    private mensajeriaServ: MensajeriaService,
    private AFauth: AngularFireAuth,
    private activatedRoute: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.datos = this.router.getCurrentNavigation().extras.state.datos;
        this.conversacion.idAnuncio = this.datos.idAnuncio
        this.conversacion.nombreAnuncio = this.datos.nombreAnuncio
        this.conversacion.idEmisor = this.datos.idEmisor
        this.conversacion.nombreEmisor = this.datos.nombreEmisor
        this.conversacion.idReceptor = this.datos.idReceptor
        this.conversacion.nombreReceptor = this.datos.nombreReceptor
        this.mensajeriaServ.getNumConversaciones(this.conversacion.idAnuncio, this.conversacion.idEmisor).get()
        .then( snapshot => {
          console.log(snapshot)
          if(snapshot.empty){
            this.mensajeriaServ.addConversacion(this.conversacion).then(
              ok=>{
                console.log(ok.id)
                this.router.navigate(['/mensajes/'+ok.id])
              }
            ).catch(
              err=>{
                console.log("conversacion no creada")
              }
            )
            console.log(this.conversacion)
          }else{
            console.log('anuncio creado')
            this.router.navigate(['/mensajes'])
          }
        }).catch(err =>{
          console.log(err)
        })        
      }
    });
  }


  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
		if (id != undefined) {
      this.verConv(id)
    }

    this.AFauth.auth.onAuthStateChanged(
			user => {
				if (user) {
          let i = 0;
          // User is signed in.
          this.uid = user.uid
          this.mensajeriaServ.getUserEmisorConversaciones(user.uid).get()
          .then(snapshot =>{
            console.log(snapshot)
            
            snapshot.forEach(doc => {
              var conversacion : Conversacion = {
                idConversacion: doc.id,
                idAnuncio: doc.data().idAnuncio,
                nombreAnuncio: doc.data().nombreAnuncio,
                idEmisor: doc.data().idEmisor,
                nombreEmisor:doc.data().nombreEmisor,
                idReceptor: doc.data().idReceptor,
                nombreReceptor: doc.data().idReceptor,
                mensajes: doc.data().mensajes
              }
              this.conversaciones[i++] = conversacion;
            });
            console.log(this.conversaciones)
          })

          this.mensajeriaServ.getUserReceptorConversaciones(user.uid).get()
          .then(snapshot =>{
            console.log(snapshot)
            snapshot.forEach(doc => {
              var conversacion : Conversacion = {
                idConversacion: doc.id,
                idAnuncio: doc.data().idAnuncio,
                nombreAnuncio: doc.data().nombreAnuncio,
                idEmisor: doc.data().idEmisor,
                nombreEmisor:doc.data().nombreEmisor,
                idReceptor: doc.data().idReceptor,
                nombreReceptor: doc.data().idReceptor,
                mensajes: doc.data().mensajes
              }
              this.conversaciones[i++] = conversacion;
            });
            console.log(this.conversaciones)
          })
				}
				else {
					// No user is signed in.
					console.log("el usuario no ha iniciado sesion.");
				}
			}
    );
  }

  verConv(id){
    console.log(id)
    this.mensajeriaServ.getConversacion(id).subscribe(
      data =>{
        this.conversacion.idConversacion = data.idConversacion,
        this.conversacion.idEmisor = data.idEmisor,
        this.conversacion.nombreEmisor = data.nombreEmisor,
        this.conversacion.idReceptor = data.idReceptor,
        this.conversacion.nombreReceptor = data.nombreReceptor,
        this.conversacion.idAnuncio = data.idAnuncio,
        this.conversacion.nombreAnuncio = data.nombreAnuncio
        this.conversacion.mensajes = data.mensajes
      }
    )
  }

  enviarMensaje(){
    console.log(this.mensaje)
    console.log(this.conversacion)
    this.mensaje.emisor = this.uid
    this.mensaje.fecha = new Date()

    this.conversacion.mensajes.push(this.mensaje)

    this.mensajeriaServ.updateConversacion(this.conversacion, this.conversacion.idConversacion)
    this.mensaje.texto = ''
    this.verConv(this.conversacion.idConversacion)
  }

}
