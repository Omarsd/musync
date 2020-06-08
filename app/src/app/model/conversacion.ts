import { Mensaje } from './mensaje'

export class Conversacion {
    idConversacion?: string
    idEmisor: string
    nombreEmisor: string
    idReceptor: string
    nombreReceptor: string
    idAnuncio: string
    nombreAnuncio: string
    mensajes : Mensaje[]
    
}
