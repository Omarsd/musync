import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-about',
	templateUrl: './about.page.html',
	styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

	constructor() { }

	ngOnInit() {
	}

	Creadores = [
		{
			imagen: 'omar.png',
			nombre: 'Omar',
			apellidos: 'Serrano Doukkali',
			rol: 'Jefe de proyecto',
			email: 'omarsd@uma.es',
			git: 'Omarsd'
		},
		{
			imagen: 'ruben.png',
			nombre: 'Rubén',
			apellidos: 'Castro Ruiz',
			rol: 'Desarrollador',
			email: 'rubencastro@uma.es',
			git: 'rubencastro24'
		},
		{
			imagen: 'Oscar.PNG',
			nombre: 'Oscar',
			apellidos: 'Diaz Saldaña',
			rol: 'Desarrollador',
			email: 'oscar.diaz@uma.es',
			git: 'DiazOscar'
		},
		{
			imagen: 'Juanma.png',
			nombre: 'Juan Manuel',
			apellidos: 'Salas Pérez',
			rol: 'Diseño',
			email: 'juanma.salas94@uma.es',
			git: 'JuanmaKsp'
		},
		{
			imagen: 'Oscarbr.png',
			nombre: 'Óscar',
			apellidos: 'Bracero Ramírez',
			rol: 'Tester',
			email: 'oscarbr@uma.es',
			git: 'oscarbr97'
		},
		{
			imagen: 'Adrian.jpg',
			nombre: 'Adrián',
			apellidos: 'Laguna Machuca',
			rol: 'Requisitos',
			email: 'adrilagunam@uma.es',
			git: 'AdriLaguna'
		}

		
	]

}
