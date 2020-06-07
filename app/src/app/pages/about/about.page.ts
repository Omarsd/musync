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
			imagen: 'ruben.png',
			nombre: 'Rubén',
			apellidos: 'Castro Ruiz',
			rol: 'Desarrollador',
			email: 'rubencastro@uma.es',
			git: 'rubencastro24'
		}
	]

}
