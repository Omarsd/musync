import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

import { AnunciosService } from 'src/app/services/anuncio.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsuarioService } from 'src/app/services/usuario.service';


describe('HomePage', () => {
	const usuarioService = <UsuarioService> {}
	const anuncioService = <AnunciosService> {}
	const authServ = <AuthService> {}
	const AFauth = <AngularFireAuth> {}

	let homePage = new HomePage(anuncioService, usuarioService, authServ, AFauth)

	describe('expandir()', () => {

		it('Si esta expandido => desespandido', ()=> {
			homePage.expandido = true;
			homePage.expandir()
			expect(homePage.expandido).toBeFalsy();
		})

		it('Si esta desespandido => expandido', ()=> {
			homePage.expandido = false;
			homePage.expandir()
			expect(homePage.expandido).toBeTruthy();
		})

	})

	describe('reiniciarCriterios()', ()=>{

		it('Valores del criterio deben borrarse', ()=>{
			homePage.criterios = {
				titulo: 'Anuncio',
				descripcion: 'descripción de anuncio',
				deFecha: new Date(),
				aFecha: new Date(),
				ubicacion: 'Lugar',
				instrumento: 'Instrumento',
				tipoDemanda: true
			}
			homePage.reinicializarCriterios();

			expect(homePage.criterios).toEqual({
					titulo: '',
					descripcion: '',
					deFecha: null,
					aFecha: null,
					ubicacion: '',
					instrumento: '',
					tipoDemanda: null
			});
		});

	});

});
