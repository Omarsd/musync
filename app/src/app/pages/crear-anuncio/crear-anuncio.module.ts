import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearAnuncioPageRoutingModule } from './crear-anuncio-routing.module';

import { CrearAnuncioPage } from './crear-anuncio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearAnuncioPageRoutingModule
  ],
  declarations: [CrearAnuncioPage]
})
export class CrearAnuncioPageModule {}
