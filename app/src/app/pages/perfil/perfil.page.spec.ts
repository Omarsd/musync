import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PerfilPage } from './perfil.page';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { ModalController } from "@ionic/angular";
import { AnunciosService } from 'src/app/services/anuncio.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';

describe('PerfilPage', () => {
	const AFauth = <AngularFireAuth> {}
	const anuncioService = <AnunciosService> {}
	const authServ = <AuthService> {}
	const usuarioService = <UsuarioService> {}
	const activatedRoute = <ActivatedRoute> {}
	const router = <Router> {}
	const modal = <ModalController> {}

	let perfilPage: PerfilPage = new PerfilPage(AFauth, anuncioService, authServ, usuarioService, activatedRoute, router, modal)


	describe('esValido(texto: String): Boolean', () => {
		let texto : String;
		it('texto = null => false', async(() => {
			texto = null;
			console.log('null')
			expect( perfilPage.esValido(texto) ).toBe(false);
		}))
		it('texto = undefined => false', async(() => {
			texto = undefined;
			expect( perfilPage.esValido(texto) ).toBe(false);
		}))
		it('texto = "" => false', async(() => {
			texto = "";
			expect( perfilPage.esValido(texto) ).toBe(false);
		}))
		it('texto = "Texto de prueba" => true', async(() => {
			texto = "Texto de prueba";
			expect( perfilPage.esValido(texto) ).toBe(true);
		}))
	});

});
