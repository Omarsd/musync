import {Component, OnInit} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {Anuncio} from '../model/Anuncio';
import {FirebaseService} from '../services/anuncio.service';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  usuario:Usuario  
  private anuncios: Observable<Anuncio[]>;

  constructor(private fbService: FirebaseService,
    private userService: UsuarioService) {
      
  }

  ngOnInit(): void {
    //this.usuario = this.userService.getUsuario(indexedDB)
    this.anuncios = this.fbService.getAllAnuncio();
  }

}
