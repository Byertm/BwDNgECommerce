import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from '@app/app-routing.module';

import { PrimeNgSharedModule } from '@shared/modules';

import { ProductService } from '@services/index';

import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';

import { AppComponent } from '@app/app.component';
import { ProductItemComponent } from '@components/index';
import { HeaderComponent, MainComponent, FooterComponent } from '@layouts/index';
import { CartComponent, ProductListComponent, ProductDetailComponent, WishlistComponent } from '@pages/index';
import { ProductFilterPipe } from '@services/search';

import { EBLogoComponent } from '@shared/components';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		MainComponent,
		FooterComponent,
		CartComponent,
		ProductListComponent,
		ProductDetailComponent,
		ProductItemComponent,
		WishlistComponent,
		ProductFilterPipe
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		HttpClientJsonpModule,
		AppRoutingModule,
		PrimeNgSharedModule,
		ButtonModule,
		RatingModule,
		EBLogoComponent
	],
	providers: [ProductService]
})
export class AppModule {}