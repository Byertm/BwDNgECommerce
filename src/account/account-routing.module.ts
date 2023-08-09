import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, LogoutComponent } from '@account/pages';
import { AuthMainComponent } from '@account/layouts/main/main.component';

const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{
		path: '',
		component: AuthMainComponent,
		children: [
			{ path: 'login', component: LoginComponent },
			{ path: 'logout', component: LogoutComponent }
		]
	},
	{ path: '**', redirectTo: '', pathMatch: 'full' } // Bulunamayan rotaları yakalayın ve ana sayfaya yönlendirin
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AccountRoutingModule {}