import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule,AngularFireAuth } from "@angular/fire/auth";
import { FormsModule } from '@angular/forms';

import { ActualizarAnuncioComponent } from "./components/actualizar-anuncio/actualizar-anuncio.component";
import { ActualizarPerfilComponent } from "./components/actualizar-perfil/actualizar-perfil.component";
import { BarraNavegacionComponent } from "./components/barra-navegacion/barra-navegacion.component";

@NgModule({
	declarations: [
		AppComponent,
		ActualizarAnuncioComponent,
		ActualizarPerfilComponent,
		BarraNavegacionComponent
	],
	entryComponents: [ ActualizarAnuncioComponent, ActualizarPerfilComponent ],
	imports: [
		BrowserModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFirestoreModule,
		AngularFireAuthModule,
		FormsModule
	],
	providers: [
		StatusBar,
		SplashScreen,
		{
			provide: RouteReuseStrategy,
			useClass: IonicRouteStrategy
		},
		{
			provide: FirestoreSettingsToken,
			useValue: {}
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
