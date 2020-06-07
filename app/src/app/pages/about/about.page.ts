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
			nombre: 'Rubén',
			apellidos: 'Castro Ruiz',
			rol: 'Desarrollador',
			imagen: 'ruben.png'
		}
	]

}
