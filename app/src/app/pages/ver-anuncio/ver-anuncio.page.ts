import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/model/Anuncio';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/anuncio.service';
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
selector: 'app-ver-anuncio',
templateUrl: './ver-anuncio.page.html',
styleUrls: ['./ver-anuncio.page.scss'],
})

export class VerAnuncioPage implements OnInit {

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

	owned: boolean;
	uid: string;

	constructor(private activatedRoute: ActivatedRoute,
		private fbService: FirebaseService,
		private router: Router,
		private AFauth: AngularFireAuth ) { }

	ngOnInit() {
		this.AFauth.auth.onAuthStateChanged(
			user => {
			  if (user) {
				// User is signed in.
				this.uid = user.uid
				console.log(this.uid)
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

}
