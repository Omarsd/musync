import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerAnuncioPageRoutingModule } from './ver-anuncio-routing.module';

import { VerAnuncioPage } from './ver-anuncio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerAnuncioPageRoutingModule
  ],
  declarations: [VerAnuncioPage]
})
export class VerAnuncioPageModule {}
