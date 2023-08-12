import { Component, HostListener, OnInit } from '@angular/core';
import { CartService, WishlistService } from '@services/index';
import { AuthService } from '@services/index';

@Component({
	selector: 'eb-app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	cartProductCount: number = 0;
	wishProductCount: number = 0;
	isLogged: boolean = true;
	sticky: boolean = false;

	constructor(private authService: AuthService, private cartService: CartService, private wishlistService: WishlistService) {}

	@HostListener('window:scroll', ['$event'])
	handleScroll() {
		const windowScroll = window.scrollY;
		if (windowScroll >= 300) this.sticky = true;
		else this.sticky = false;
	}

	loadControls(): void {
		this.cartService.cart$.subscribe((cart) => {
			this.cartProductCount = cart?.items?.length ?? 0;
		});

		this.wishlistService.wishList$.subscribe((wishList) => {
			this.wishProductCount = wishList?.items?.length ?? 0;
		});

		// this.isLogged = this.authService.getLogged();
		this.authService.isLogging().subscribe((isLogged) => {
			this.isLogged = isLogged;
		});
	}

	ngOnInit(): void {
		this.loadControls();
	}
}