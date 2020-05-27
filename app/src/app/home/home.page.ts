import {Component, OnInit} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {Anuncio} from '../model/Anuncio';
import {FirebaseService} from '../services/anuncio.service';
import { Usuario } from '../model/usuario';
import { AuthService } from "../services/auth.service";
import { isNullOrUndefined } from 'util';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from "@angular/router";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  usuario:Usuario
  logedout:boolean

  private anuncios: Observable<Anuncio[]>;
  private anunciosFiltrados: Observable<Anuncio[]>;

  constructor(private fbService: FirebaseService,
              public authservice : AuthService,
              private AFauth : AngularFireAuth,
              private router : Router) {}

  ngOnInit(): void {

    this.anuncios = this.fbService.getAllAnuncio();
    this.anunciosFiltrados = this.anuncios

    //Si esta logueado, pone logedout a false. esto cambia los botones "registrarse", "login" y "logout"
    if(this.authservice.isAuthenticated){
      this.logedout = false
    }else{
      this.logedout = true
    }
    
    this.AFauth.authState.subscribe(auth => {
      if (isNullOrUndefined(auth)){
        this.logedout = true
      } else{
        this.logedout = false
      }
    })

  }

  async filtrarAnuncios(evt){
    const searchTerm = evt.srcElement.value;

    // Si no hay valores en la busqueda, inicializa la lista de filtrados
    if(!searchTerm){
      return this.anunciosFiltrados = this.anuncios;
    }

    // Esto es lo que filtra.
    return this.anunciosFiltrados=this.anuncios.pipe (
      map(items => 
        items.filter(item => item.titulo.toLowerCase().indexOf(searchTerm.toLowerCase())       > -1 || 
                            item.instrumento.toLowerCase().indexOf(searchTerm.toLowerCase())  > -1 ||
                            item.descripcion.toLowerCase().indexOf(searchTerm.toLowerCase())  > -1 ||
                            item.ubicacion.toLowerCase().indexOf(searchTerm.toLowerCase())    > -1 )) )
    
  }

  logout(){
    this.authservice.logout()
    this.logedout = true
  }

  goToSignIn(){
    this.router.navigate(['/registrarse']);
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }

}
