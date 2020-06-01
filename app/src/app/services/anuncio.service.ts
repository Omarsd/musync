import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anuncio } from '../model/Anuncio';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference, DocumentData, Query } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { formatDate } from '@angular/common';


@Injectable({
	providedIn: 'root'
})
export class FirebaseService {
	private anuncios: Observable<Anuncio[]>;
	private anuncioColl: AngularFirestoreCollection<Anuncio>;

	constructor(
		private afs: AngularFirestore,
	) {
		//console.log(this.datepipe.transform(Date.now()),'')
		this.anuncioColl = this.afs.collection<Anuncio>('anuncios', ref => {
			// Compose a query using multiple .where() methods

			return ref.orderBy("fechaEvento", "desc").endAt(formatDate(Date.now(), 'yyyy-MM-dd', "en-US"))

		});

		this.anuncios = this.anuncioColl.snapshotChanges().pipe(
			map(actions => {
				return actions.map(a => {
					const data = a.payload.doc.data();
					const id = a.payload.doc.id;
					return { id, ...data };
				});
			})
		);
	}

	getAllAnuncio(): Observable<Anuncio[]> {
		return this.anuncios;
	}

	getAnuncio(id: string): Observable<Anuncio> {
		/*return this.anuncioColl.doc<Anuncio>(id).valueChanges().pipe(
			take(1),
			map(data => {
				data.id = id;
				return data;
			})
		);*/
		return this.anuncioColl.doc<Anuncio>(id).valueChanges().pipe(take(1));
	}

	getAnunciosMusico(idMusico: string): Query {

		// Create a reference to the cities collection
		var citiesRef = this.afs.firestore.collection("anuncios");

		// Create a query against the collection.
		var query = citiesRef.where("idMusico", "==", idMusico)
		
		return query
	}

	addAnuncio(anuncio: Anuncio): Promise<DocumentReference> {
		return this.anuncioColl.add(anuncio);
	}

	updateAnuncio(anuncio: Anuncio): Promise<void> {
		console.log(anuncio.tipoDemanda)
		return this.anuncioColl.doc(anuncio.id).update({
			titulo: anuncio.titulo,
			descripcion: anuncio.descripcion,
			ubicacion: anuncio.ubicacion,
			instrumento: anuncio.instrumento,
			fechaEvento: anuncio.fechaEvento,
			tipoDemanda: anuncio.tipoDemanda

		});
	}

	deleteAnuncio(id: string): Promise<void> {
		return this.anuncioColl.doc(id).delete();
	}
}
