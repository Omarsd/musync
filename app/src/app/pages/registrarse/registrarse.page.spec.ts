import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { RegistrarsePage } from './registrarse.page';
import { asapScheduler, Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';


describe('RegistrarsePage', () => {
	/*
	beforeEach(() => {
		TestBed.configureTestingModule({ providers: [UsuarioService] });
	});

	//let usuarios : Observable<Usuario[]>
	const auth = <AngularFireAuth>{}
	const alertController = <AlertController>{}
	const router = <Router>{}
	const usuarioService = <UsuarioService>{}
	const component = new RegistrarsePage(auth, alertController, router, usuarioService)

	it('BRUUU', () => {
		var len
		let service = TestBed.get(usuarioService);
		component.usuarioService.getAllUsuario().subscribe(asd => {
			len = asd.length
		})
		component.password = 'hola'
		component.confirm_password = 'adios'
		console.log(len)
		expect(len).toEqual(5)

	})
	*/
});

