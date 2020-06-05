import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anuncio } from '../model/Anuncio';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference, DocumentData, Query } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Injectable({
	providedIn: 'root'
})
export class AnunciosService {
	private anuncios: Observable<Anuncio[]>;
	private anuncioColl: AngularFirestoreCollection<Anuncio>;

	constructor(
		private afs: AngularFirestore,
		private alertController: AlertController,
		private router: Router,
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
		var citiesRef = this.afs.firestore.collection("anuncios");
		var query = citiesRef.where("idMusico", "==", idMusico)
		
		return query
	}

	addAnuncio(anuncio: Anuncio): Promise<DocumentReference> {
		return this.anuncioColl.add(anuncio);
	}

	updateAnuncio(anuncio: Anuncio): Promise<void> {
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

	async alertConfirmarEliminar(id) {
		const alert = await this.alertController.create({
			header: 'Eliminar anuncio.',
			message: 'Esta acción será <strong>insalvable</strong>.',
			buttons: [
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'secondary',
					handler: () => {
						console.log('El anuncio no se ha eliminado');
					}
				}, {
					text: 'Eliminar',
					handler: () => {
						console.log('El anuncio será eliminado');
						this.deleteAnuncio(id)
						this.router.navigate(['/home']);
					}
				}
			]
		});
		await alert.present();
	}
}
