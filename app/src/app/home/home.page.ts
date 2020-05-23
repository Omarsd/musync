import {Component, OnInit} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {Anuncio} from '../model/Anuncio';
import {FirebaseService} from '../services/anuncio.service';
import { Usuario } from '../model/usuario';
import { AuthService } from "../services/auth.service";
import { isNullOrUndefined } from 'util';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  usuario:Usuario
  logedout:boolean

  private anuncios: Observable<Anuncio[]>;

  constructor(private fbService: FirebaseService,
    //private userService: UsuarioService,
    public authservice : AuthService,
    private AFauth : AngularFireAuth,
    private router : Router) {}

  ngOnInit(): void {
    //this.usuario = this.userService.getUsuario(indexedDB)
    this.anuncios = this.fbService.getAllAnuncio();
    
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
