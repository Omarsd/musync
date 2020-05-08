import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActAnuncioPageRoutingModule } from './act-anuncio-routing.module';

import { ActAnuncioPage } from './act-anuncio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActAnuncioPageRoutingModule
  ],
  declarations: [ActAnuncioPage]
})
export class ActAnuncioPageModule {}
