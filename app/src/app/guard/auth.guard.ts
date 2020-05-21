import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { isNullOrUndefined } from "util";
import { map } from "rxjs/operators";

@Injectable({
providedIn: 'root'
})

// ESTE ES EL GUARD QUE NO TE DEJA VER SI (NO ESTAS LOGUEADO)
export class AuthGuard implements CanActivate {

	constructor(private AFauth : AngularFireAuth,
				private router : Router){}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.AFauth.authState.pipe(map( auth =>{
			if(isNullOrUndefined(auth)){
				this.router.navigate(['/login'])
				return false
			}
			else{
				return true
			}
		}))	
	}	
}