import {Component, OnInit} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {Anuncio} from '../model/Anuncio';
import {FirebaseService} from '../services/anuncio.service';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

	private anuncios: Observable<Anuncio[]>;
	private anunciosFiltrados: Observable<Anuncio[]>;

	constructor(private fbService: FirebaseService) {}

	ngOnInit(): void {

		this.anuncios = this.fbService.getAllAnuncio();

		this.anunciosFiltrados = this.anuncios;

	}

	async filtrarAnuncios(evt) {
		const searchTerm = evt.srcElement.value;

		// Si no hay valores en la busqueda, inicializa la lista de filtrados
		if(!searchTerm){
			return this.anunciosFiltrados = this.anuncios;
		}

		// Esto es lo que filtra.
		return this.anunciosFiltrados=this.anuncios.pipe(map(
			items => items.filter(
				item =>
					item.titulo.toLowerCase().indexOf(searchTerm.toLowerCase())       > -1 || 
					item.instrumento.toLowerCase().indexOf(searchTerm.toLowerCase())  > -1 ||
					item.descripcion.toLowerCase().indexOf(searchTerm.toLowerCase())  > -1 ||
					item.ubicacion.toLowerCase().indexOf(searchTerm.toLowerCase())    > -1 
			)
		))
	}

}
