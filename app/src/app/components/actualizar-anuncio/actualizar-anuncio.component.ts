import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/anuncio.service';
import { Anuncio } from 'src/app/model/Anuncio';
import { NavParams, ModalController } from "@ionic/angular";

@Component({
  selector: 'app-actualizar-anuncio',
  templateUrl: './actualizar-anuncio.component.html',
  styleUrls: ['./actualizar-anuncio.component.scss'],
})



export class ActualizarAnuncioComponent implements OnInit {
	
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

	owned : boolean;
	uid : string;

	constructor( private navparams : NavParams,
				 private modal : ModalController,
				 private fbService: FirebaseService ) {
	}

	ngOnInit() {

		this.anuncio = this.navparams.get('anuncio')
		this.owned = this.navparams.get('owned')
		this.uid = this.navparams.get('uid')

		console.log(this.anuncio)
	}

	salir(){
		this.modal.dismiss()
	}

	updateAnuncio() {
		this.fbService.updateAnuncio(this.anuncio).then(() => {
		this.salir();
		}, err => {
		});
	}

  /* anuncio: Anuncio = {
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

	constructor(private activatedRoute: ActivatedRoute, 
		private fbService: FirebaseService, 
		private router: Router) {
	}

	ngOnInit() {
	}

	ngAfterViewInit(): void {
		const id = this.activatedRoute.snapshot.paramMap.get('id');
		if (id) {
			this.fbService.getAnuncio(id).subscribe(
				data => {
					this.anuncio = data;
				},
				err => {
					this.router.navigate(['/no-encontrado']);
				}
			);
		}
	}

	updateAnuncio() {
		this.fbService.updateAnuncio(this.anuncio).then(() => {
		this.router.navigate(['/']);
		}, err => {
		});
	} */
}