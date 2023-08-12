import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { CartComponent, ProductListComponent, ProductDetailComponent, WishlistComponent } from '@pages/index';
import { AuthGuard } from '@services/index';

const routes: Routes = [
	{
		path: '',
		component: AppComponent,
		children: [
			{ path: '', redirectTo: 'products', pathMatch: 'full' },
			{ path: 'products', component: ProductListComponent },
			{ path: 'products/detail/:id', component: ProductDetailComponent },
			{ path: 'cart', component: CartComponent },
			{ path: 'wishlist', component: WishlistComponent },
			{ path: '**', redirectTo: '/error', pathMatch: 'full' }
		],
		canActivate: [AuthGuard]
	},
	{ path: '**', redirectTo: '', pathMatch: 'full' } // Bulunamayan rotaları yakalayın ve ana sayfaya yönlendirin
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}