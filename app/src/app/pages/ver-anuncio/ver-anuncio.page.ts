import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/model/Anuncio';
import { Usuario } from 'src/app/model/usuario';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { FirebaseService } from 'src/app/services/anuncio.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { ActualizarAnuncioComponent } from "../../components/actualizar-anuncio/actualizar-anuncio.component";
import { ModalController } from "@ionic/angular";


@Component({
selector: 'app-ver-anuncio',
templateUrl: './ver-anuncio.page.html',
styleUrls: ['./ver-anuncio.page.scss'],
})

export class VerAnuncioPage implements OnInit {

	usuario: Usuario = {
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

	anuncio: Anuncio = {
		id : '',
		idMusico : '',
    	titulo:  '',
		descripcion:  '',
		createdAt:  '',
		fechaEvento:  null,
		ubicacion:  '',
		instrumento:  '',
		tipoDemanda:  null,
	}

	rate: number = 3;
	owned: boolean;
	uid: string;

	constructor(private activatedRoute: ActivatedRoute,
				private fbService: FirebaseService,
				private router: Router,
				private AFauth: AngularFireAuth,
				private modal: ModalController,
				private usuarioService: UsuarioService ) { }

	ngOnInit() {
		this.AFauth.auth.onAuthStateChanged(
			user => {
			  if (user) {
				// User is signed in.
				this.uid = user.uid
			  }
			  else {
				// No user is signed in.
				console.log("el usuario no ha iniciado sesion.");
			  }
			}
		  );
	  
	}

	ngAfterViewInit(): void {
		const id = this.activatedRoute.snapshot.paramMap.get('id');
		if (id) {
			this.fbService.getAnuncio(id).subscribe(
				data => {
					this.anuncio = data;
					
					if(data.idMusico == this.uid){
						this.owned = true
					} else{
						this.owned = false
					}
					
					this.usuarioService.getUsuario(this.anuncio.idMusico).subscribe(
						data => {
							this.usuario = data;	
						}
					);
					
				},
				err => {
					this.router.navigate(['/no-encontrado'])
				}
			);
			
		}
	}

	deleteAnuncio() {
		this.fbService.deleteAnuncio(this.anuncio.id).then(
			() => {
				this.router.navigateByUrl('/');
			},
			err => {
				console.error("Error:")
				console.error(err);
			}
		);
	}

	actualizarAnuncio(){
		this.modal.create({
			component: ActualizarAnuncioComponent,
			componentProps : {
				anuncio :this.anuncio,
				owned: this.owned,
				uid: this.uid
			}	
		}).then((modal) => modal.present())
	}

	logRatingChange(rating){
        console.log("changed rating: ",rating);
        // do your stuff
	}
	
	enviarMensaje(){

		
		let datos = {
			idAnuncio: this.anuncio.id,
			idReceptor: this.anuncio.idMusico,
			idEmisor: this.usuario.id
		}
		let navigationExtras: NavigationExtras = {
			state: {
			  datos: datos
			}
		  };

		  console.log(navigationExtras.state)
		  this.router.navigate(['/mensajes'], navigationExtras);
		
	}
}
