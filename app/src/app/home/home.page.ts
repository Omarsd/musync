import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Anuncio } from '../model/Anuncio';
import { FirebaseService } from '../services/anuncio.service';
import { UsuarioService } from "../services/usuario.service";
import { Usuario } from '../model/usuario';
import { AuthService } from "../services/auth.service";
import { isNullOrUndefined } from 'util';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from "@angular/router";
import { map } from 'rxjs/operators';

interface criteriosBusqueda {
	titulo: string;
	descripcion: string;
	deFecha: Date;
	aFecha: Date;
	ubicacion: String;
	instrumento: String;
	tipoDemanda: Boolean;
}

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

	today: Date= new Date();

	usuario: Usuario = {
		nick: '',
		nombreCompleto: '',
		email: '',
		cp: '',
		descripcion: '',
		imagenPerfil: '',
		rol: '',
		baneado: '',
		fechaBaneo: null,
		fechaDesbaneo: null
	}

	logedout: boolean
	expandido: boolean

	criterios: criteriosBusqueda = {
		titulo: '',
		descripcion: '',
		deFecha: null,
		aFecha: null,
		ubicacion: '',
		instrumento: '',
		tipoDemanda: null
	}

	private anuncios: Observable<Anuncio[]>;
	private anunciosFiltrados: Observable<Anuncio[]>;

	constructor(private fbService: FirebaseService,
		public authservice: AuthService,
		private AFauth: AngularFireAuth,
		private router: Router,
		private userService: UsuarioService) { }

	ngOnInit(): void {

		this.anuncios = this.fbService.getAllAnuncio();
		this.anunciosFiltrados = this.anuncios

		//Si esta logueado, pone logedout a false. esto cambia los botones "registrarse", "login" y "logout"
		if (this.authservice.isAuthenticated) {
			this.logedout = false
		} else {
			this.logedout = true
		}

		this.AFauth.authState.subscribe(auth => {
			if (isNullOrUndefined(auth)) {
				this.logedout = true
			} else {
				this.logedout = false
				this.userService.getUsuario(auth.uid).subscribe(
					data => {
						this.usuario = data;
						console.log(this.usuario.rol)
					}
				);
			}
		})


	}


	async busquedaAnuncios() {
		// Esto es lo que filtra.
		return this.anunciosFiltrados = this.anuncios.pipe(
			map(items =>
				items.filter(item =>
					(item.titulo.toLowerCase().indexOf(this.criterios.titulo.toLowerCase()) > -1 || this.criterios.titulo == '') &&
					(item.instrumento.toLowerCase().indexOf(this.criterios.instrumento.toLowerCase()) > -1 || this.criterios.instrumento == '') &&
					(item.descripcion.toLowerCase().indexOf(this.criterios.descripcion.toLowerCase()) > -1 || this.criterios.descripcion == '') &&
					(item.ubicacion.toLowerCase().indexOf(this.criterios.ubicacion.toLowerCase()) > -1 || this.criterios.ubicacion == '') &&
					(item.fechaEvento <= this.criterios.aFecha || this.criterios.aFecha == null) && (item.fechaEvento >= this.criterios.deFecha || this.criterios.deFecha == null) &&
					(item.tipoDemanda == this.criterios.tipoDemanda || this.criterios.tipoDemanda == null)
				)))

	}

	async busquedaRapida(evt) {
		const searchTerm: string = evt.srcElement.value;

		// Esto es lo que filtra.
		return this.anunciosFiltrados = this.anuncios.pipe(
			map(items =>
				items.filter(item =>
					item.titulo.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
					item.instrumento.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
					item.descripcion.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
					item.ubicacion.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)))
	}

	reinicializarCriterios() {
		this.criterios = {
			titulo: '',
			descripcion: '',
			deFecha: null,
			aFecha: null,
			ubicacion: '',
			instrumento: '',
			tipoDemanda: null
		}
	}

	borrarFiltro() {
		this.reinicializarCriterios();
		this.anunciosFiltrados = this.anuncios
	}

	logout() {
		this.authservice.logout()
		this.logedout = true
	}

	expandir() {
		if (this.expandido) {
			this.expandido = false
		} else {
			this.expandido = true
		}
	}

}
