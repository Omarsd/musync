import { Injectable } from '@angular/core';
import { Conversacion } from '../model/conversacion';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class MensajeriaService {
	private conversacion: Observable<Conversacion[]>;
	private conversacionColl: AngularFirestoreCollection<Conversacion>;

	constructor(private afs: AngularFirestore) {
		this.conversacionColl = this.afs.collection<Conversacion>('conversaciones');
		this.conversacion = this.conversacionColl.snapshotChanges().pipe(
			map(actions => {
				return actions.map(a => {
					const data = a.payload.doc.data();
					const id = a.payload.doc.id;
					return { id, ...data };
				});
			})
		);
	}

	getAllConversacion(): Observable<Conversacion[]> {
		return this.conversacion;
	}

	getConversacion(id: string): Observable<Conversacion> {
		return this.conversacionColl.doc<Conversacion>(id).valueChanges().pipe(
			take(1),
			map(data => {
				data.idConversacion = id;
				return data;
			})
		);
	}

	addConversacion(conversacion: Conversacion): Promise<DocumentReference> {
		return this.conversacionColl.add(conversacion);
	}

	updateConversacion(conversacion: Conversacion, id: string) {
		this.afs.collection('conversaciones').doc(id).set(conversacion);
	}

	deleteConversacion(id: string): Promise<void> {
		return this.conversacionColl.doc(id).delete();
	}
}
