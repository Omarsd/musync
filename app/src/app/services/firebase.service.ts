import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Anuncio} from '../model/Anuncio';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private anuncios: Observable<Anuncio[]>;
  private anuncioColl: AngularFirestoreCollection<Anuncio>;

  constructor(private afs: AngularFirestore) {
    this.anuncioColl = this.afs.collection<Anuncio>('anuncios');
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
    return this.anuncioColl.doc<Anuncio>(id).valueChanges().pipe(
        take(1),
        map(data => {
          data.id = id;
          return data;
        })
    );
  }

  addAnuncio(anuncio: Anuncio): Promise<DocumentReference> {
    return this.anuncioColl.add(anuncio);
  }

  updateAnuncio(anuncio: Anuncio): Promise<void> {
    return this.anuncioColl.doc(anuncio.id).update({ titulo: anuncio.titulo, descripcion: anuncio.descripcion });
  }

  deleteAnuncio(id: string): Promise<void> {
    return this.anuncioColl.doc(id).delete();
  }
}
