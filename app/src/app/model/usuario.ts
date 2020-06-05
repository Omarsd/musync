import { AngularFireAuth } from '@angular/fire/auth';

export interface Usuario {

    id?: any,
    nick: string,
    nombreCompleto: string,
    email: string,
	cp: string,
	descripcion: string,
	imagenPerfil: string,
    rol: string,
    baneado?: string,
    fechaBaneo?: Date,
    fechaDesbaneo?: Date

}
