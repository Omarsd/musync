import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerAnuncioPage } from './ver-anuncio.page';

const routes: Routes = [
  {
    path: '',
    component: VerAnuncioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerAnuncioPageRoutingModule {}
