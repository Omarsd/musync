import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'crear-anuncio',
    loadChildren: () => import('./pages/crear-anuncio/crear-anuncio.module').then( m => m.CrearAnuncioPageModule)
  },
  {
    path: 'act-anuncio/:id',
    loadChildren: () => import('./pages/act-anuncio/act-anuncio.module').then( m => m.ActAnuncioPageModule)
  },
  {
    path: 'ver-anuncio/:id',
    loadChildren: () => import('./pages/ver-anuncio/ver-anuncio.module').then( m => m.VerAnuncioPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
