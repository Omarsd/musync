import { Mensaje } from './mensaje'

export class Conversacion {
    idConversacion?: string
    idEmisor: string
    idReceptor: string
    idAnuncio: string
    mensajes : Mensaje[]
    
}
