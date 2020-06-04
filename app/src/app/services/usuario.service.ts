import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class UsuarioService {

	private usuarios: Observable<Usuario[]>;
	private usuarioColl: AngularFirestoreCollection<Usuario>;

	constructor(private afs: AngularFirestore) {
		this.usuarioColl = this.afs.collection<Usuario>('usuarios');
		this.usuarios = this.usuarioColl.snapshotChanges().pipe(
			map(actions => {
				return actions.map(a => {
					const data = a.payload.doc.data();
					const id = a.payload.doc.id;
					return { id, ...data };
				});
			})
		);
	}

	getAllUsuario(): Observable<Usuario[]> {
		return this.usuarios;
	}

	getUsuario(id: string): Observable<Usuario> {
		return this.usuarioColl.doc<Usuario>(id).valueChanges().pipe(
			take(1),
			map(data => {
				data.id = id;
				return data;
			})
		);
	}

	addUsuario(usuario: Usuario, id: string) {
		return this.usuarioColl.doc(id).set(usuario);
	}

	updateUsuario(usuario: Usuario, id: string): Promise<void> {
		console.log('cambio de perfil:', usuario, id)
		return this.usuarioColl.doc(id).update({
			nick: usuario.nick,
			nombreCompleto: usuario.nombreCompleto,
			cp: usuario.cp,
			descripcion: usuario.descripcion,
			rol: usuario.rol,
			baneado: usuario.baneado,
			fechaBaneo: usuario.fechaBaneo,
			fechaDesbaneo: usuario.fechaDesbaneo
		});
	}

	deleteUsuario(id: string): Promise<void> {
		console.log('eliminar de la base de datos.', id)
		return this.usuarioColl.doc(id).delete()
	}
}
