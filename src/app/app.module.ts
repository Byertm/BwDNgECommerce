import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from '@app/app-routing.module';

import { PrimeNgSharedModule } from '@shared/modules';

import { ProductService } from '@services/index';

import { ButtonModule } from 'primeng/button';

import { AppComponent } from '@app/app.component';
import { ProductItemComponent } from '@components/index';
import { HeaderComponent, MainComponent, FooterComponent } from '@layouts/index';
import { ProductListComponent, ProductDetailComponent, CartComponent } from '@pages/index';

@NgModule({
	declarations: [AppComponent, HeaderComponent, MainComponent, FooterComponent, CartComponent, ProductListComponent, ProductDetailComponent, ProductItemComponent],
	imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, HttpClientJsonpModule, AppRoutingModule, ButtonModule, PrimeNgSharedModule],
	providers: [ProductService]
})
export class AppModule {}