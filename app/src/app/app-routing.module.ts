import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./guard/auth.guard";
import { NoAuthGuard } from "./guard/no-auth.guard";

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home', 
		pathMatch: 'full'
	},
	{
		path: 'home',
		loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
		},
	{
		path: 'crear-anuncio',
		loadChildren: () => import('./pages/crear-anuncio/crear-anuncio.module').then( m => m.CrearAnuncioPageModule),
		canActivate : [AuthGuard]
	},
	{
		path: 'ver-anuncio/:id',
		loadChildren: () => import('./pages/ver-anuncio/ver-anuncio.module').then( m => m.VerAnuncioPageModule)
	},
	{
		path: 'about',
		loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
	},
	{
		path: 'registrarse',
		loadChildren: () => import('./pages/registrarse/registrarse.module').then( m => m.RegistrarsePageModule),
		canActivate : [NoAuthGuard]
	},
	{
		path: 'login',
		loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
		canActivate : [NoAuthGuard]
	},
	{
		path: 'no-encontrado',
		loadChildren: () => import('./pages/no-encontrado/no-encontrado.module').then( m => m.NoEncontradoPageModule)
	},
	//'**' Es para cuando se entra en una ruta que no está declarada
	{
		path: '**',
		redirectTo: 'no-encontrado'
	}

];

@NgModule({
imports: [
	RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
],
exports: [RouterModule]
})
export class AppRoutingModule { }
