import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { RootRoutingModule } from '@src/root-routing.module';

import { PrimeToastModule } from '@shared/modules/primeng-toast.module';

import { AuthService } from '@services/index';
import { CartService, WishlistService } from '@services/cart/index';

import { JwtInterceptor } from '@shared/helpers/jwt.interceptor';

import { RootComponent } from '@src/root.component';
import { ErrorPageComponent } from '@pages/index';

@NgModule({
	imports: [CommonModule, BrowserModule, BrowserAnimationsModule, HttpClientModule, HttpClientJsonpModule, PrimeToastModule, RootRoutingModule],
	declarations: [RootComponent, ErrorPageComponent],
	providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
	bootstrap: [RootComponent]
})
export class RootModule {
	constructor(private authService: AuthService, private cartService: CartService, private wishlistService: WishlistService) {
		this.cartService.initCartLocalStorage();

		this.wishlistService.initWishlistLocalStorage();

		this.authService.getAuthFromLocalStorage();
	}
}