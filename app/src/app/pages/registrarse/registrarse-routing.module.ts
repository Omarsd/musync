import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarsePage } from './registrarse.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarsePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarsePageRoutingModule {}
