import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/model/usuario';
import { NavParams, ModalController } from "@ionic/angular";

@Component({
	selector: 'app-actualizar-perfil',
	templateUrl: './actualizar-perfil.component.html',
	styleUrls: ['./actualizar-perfil.component.scss'],
})



export class ActualizarPerfilComponent implements OnInit {

	today: Date = new Date();


	perfil: Usuario = {
		id: '',
		email: '',
		nombreCompleto: '',
		nick: '',
		cp: '',
		descripcion: '',
		rol: '',
		baneado: '',
		fechaBaneo: null,
		fechaDesbaneo: null
	}

	perfilTMP: Usuario = {
		id: '',
		email: '',
		nombreCompleto: '',
		nick: '',
		cp: '',
		descripcion: '',
		rol: '',
		baneado: '',
		fechaBaneo: null,
		fechaDesbaneo: null
	}

	owned: boolean;
	uid: string;

	constructor(private navparams: NavParams,
		private modal: ModalController,
		private usService: UsuarioService) {
	}

	ngOnInit() {
		this.perfil = this.navparams.get('perfil')
		this.owned = this.navparams.get('owned')
		this.uid = this.navparams.get('uid')
		Object.assign(this.perfilTMP, this.perfil)
		console.log(this.perfil)
	}

	salir() {
		this.modal.dismiss()
	}

	updatePerfil() {
		this.usService.updateUsuario(this.perfilTMP, this.perfil.id).then(
			() => {
				Object.assign(this.perfil, this.perfilTMP)
				this.salir();
			},
			err => {
				console.log('err', err)
			}
		);
	}
}
