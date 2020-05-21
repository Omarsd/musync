import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/model/Anuncio';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/anuncio.service';

@Component({
selector: 'app-ver-anuncio',
templateUrl: './ver-anuncio.page.html',
styleUrls: ['./ver-anuncio.page.scss'],
})

export class VerAnuncioPage implements OnInit {

	anuncio: Anuncio = {
		id: '',
		titulo: '',
		descripcion: '',
		createdAt: ''
	};

	constructor(private activatedRoute: ActivatedRoute,
		private fbService: FirebaseService,
		private router: Router) { }

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
