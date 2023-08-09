import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { CartComponent, ProductListComponent, ProductDetailComponent } from '@pages/index';

const routes: Routes = [
	{
		path: '',
		component: AppComponent,
		children: [
			{ path: '', redirectTo: 'products', pathMatch: 'full' },
			{
				path: 'products',
				component: ProductListComponent,
				children: [{ path: 'detail/:id', component: ProductDetailComponent }]
			},
			{ path: 'cart', component: CartComponent },
			{ path: '**', redirectTo: '/app', pathMatch: 'full' }
		]
	},
	{ path: '**', redirectTo: '', pathMatch: 'full' } // Bulunamayan rotaları yakalayın ve ana sayfaya yönlendirin
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}