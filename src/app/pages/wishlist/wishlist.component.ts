import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, WishlistService } from '@services/cart/index';
import { PrimeToastService } from '@services/plugins';
import { type ICartItem } from '@services/cart/cart.service';
import { ConfirmationService } from 'primeng/api';
import { IProduct } from '@models/index';
import { IWishItem } from '@services/cart/wishlist.service';

@Component({
	selector: 'eb-wishlist',
	templateUrl: './wishlist.component.html',
	styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
	wishlistCount: number = 0;
	totalPrice: number = 0;
	cartCount: number = 0;
	isProductInCartList: boolean = false;
	cartList: ICartItem[] = [];
	wishList: IWishItem[] = [];

	get isWishListCount() {
		return this.wishList.length > 0;
	}

	constructor(
		private cartService: CartService,
		private wishlistService: WishlistService,
		private primeToastService: PrimeToastService,
		private confirmationService: ConfirmationService
	) {}

	identify(_index: number, item: IWishItem) {
		return item.product?.id;
	}

	getCartList() {
		this.cartService.cart$.subscribe((cart) => {
			this.cartList = cart?.items ? cart.items : [];
			this.cartCount = cart?.items?.length ?? 0;
		});
	}

	checkProductInCartList(productId?: number): boolean {
		const cartItemExist = productId && this.cartList.find((item) => item?.product?.id === productId);
		this.isProductInCartList = !!productId && !!cartItemExist;
		return !!productId && !!cartItemExist;
	}

	getWishList() {
		this.wishlistService.wishList$.subscribe((wishlist) => {
			this.wishList = wishlist?.items ? wishlist.items : [];
			this.wishlistCount = wishlist?.items?.length ?? 0;
		});
	}

	deleteWishItem(pProductId: number) {
		this.wishlistService.deleteWishItem(pProductId);
		this.primeToastService.error({ summary: 'Ürün istek listesinden silindi!', position: 'top-left' });
	}

	addProductToCart(item: IProduct) {
		const cartItem: ICartItem = { product: item, quantity: 1 };
		this.cartService.setCartItem(cartItem);
		this.primeToastService.success({ summary: 'Ürün başarıyla sepete eklendi!', position: 'top-left' });
	}

	confirmTransferProduct(event: Event, product: IProduct) {
		event.preventDefault?.();

		this.confirmationService.confirm({
			target: event.target as EventTarget,
			message: 'Ürünü sepete eklemeye devam etmek istediğinizden emin misiniz?',
			icon: 'pi pi-exclamation-triangle',
			acceptLabel: 'Evet, Aktar',
			rejectLabel: 'Hayır, Kalsın',
			accept: () => {
				this.addProductToCart(product);
				this.deleteWishItem(product?.id);
			},
			reject: () => {}
		});
	}

	confirmDeleteProduct(event: Event, productId: number) {
		event.preventDefault?.();

		this.confirmationService.confirm({
			target: event.target as EventTarget,
			message: 'Devam etmek istediğinizden emin misiniz?',
			icon: 'pi pi-exclamation-triangle',
			acceptLabel: 'Evet :)',
			rejectLabel: 'Hayır :(',
			accept: () => {
				this.deleteWishItem(productId);
			},
			reject: () => {}
		});
	}

	confirmEmptyWishList(event: Event) {
		event.preventDefault?.();

		this.confirmationService.confirm({
			target: event.target as EventTarget,
			message: 'İstek listesini boşaltmak istediğinize emin misiniz?',
			icon: 'pi pi-exclamation-triangle',
			acceptLabel: 'Evet',
			rejectLabel: 'Hayır',
			accept: () => {
				this.wishlistService.emptyCart();
			},
			reject: () => {}
		});
	}

	ngOnInit(): void {
		this.getCartList();

		this.getWishList();
	}
}