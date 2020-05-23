import { AngularFireAuth } from '@angular/fire/auth';

export interface Usuario {

    id?: any,
    nick: string,
    nombreCompleto: string,
    email: string,
    cp: string,
    rol: string,
    baneado?: string,
    fechaBaneo?: Date,
    fechaDesbaneo?: Date

}
