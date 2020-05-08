import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearAnuncioPage } from './crear-anuncio.page';

const routes: Routes = [
  {
    path: '',
    component: CrearAnuncioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearAnuncioPageRoutingModule {}
