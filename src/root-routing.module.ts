import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const baseFirstPageUrl: string = '/app/products';

const routes: Routes = [
	{ path: '', redirectTo: baseFirstPageUrl, pathMatch: 'full' },
	{
		path: 'auth',
		loadChildren: () => import('@account/account.module').then((m) => m.AccountModule), // Lazy load account module
		data: { preload: true }
	},
	{
		path: 'app',
		loadChildren: () => import('@app/app.module').then((m) => m.AppModule), // Lazy load app module
		data: { preload: true }
	},
	{ path: '**', redirectTo: baseFirstPageUrl, pathMatch: 'full' } // Bulunamayan rotaları yakalayın ve ana sayfaya yönlendirin
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: []
})
export class RootRoutingModule {}