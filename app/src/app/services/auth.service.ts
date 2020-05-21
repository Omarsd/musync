import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth : AngularFireAuth,
    private router : Router) { }

  //El login lo controlamos aqui. Lo hace diferente. Me he copiado de este video https://www.youtube.com/watch?v=frm49cIPp_0
  //Ya pondremos los errores que vayan saliendo

  login(email:string, password:string){

    
    return new Promise((resolve, rejected) => {
      this.AFauth.auth.signInWithEmailAndPassword(email, password).then(user => {
        resolve(user);
        this.router.navigate(['/home'])
      }).catch(err => rejected(err))
    })
  }

  logout(){
    this.AFauth.auth.signOut()
    this.router.navigate(['/home']);
  }

  isAuthenticated(){
    
    this.AFauth.authState.subscribe(auth => {
      if (isNullOrUndefined(auth)){
        return false
      } else{
        return true
      }
    })

  }
}
