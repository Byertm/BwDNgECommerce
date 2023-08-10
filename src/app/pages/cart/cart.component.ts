import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '@services/cart/index';
import { PrimeToastService } from '@services/plugins';
import { type ICartItem } from '@services/cart/cart.service';
import { ConfirmationService } from 'primeng/api';

@Component({
	selector: 'eb-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
	cartCount = 0;
	totalPrice: number = 0;
	cartList: ICartItem[] = [];

	constructor(private router: Router, private cartService: CartService, private primeToastService: PrimeToastService, private confirmationService: ConfirmationService) {}

	getCartList() {
		this.cartService.cart$.subscribe((cart) => {
			this.cartList = cart?.items ? cart.items : [];
		});
	}

	deleteCartItem(pProductId: number) {
		this.cartService.deleteCartItem(pProductId);

		this.primeToastService.error({ summary: 'Ürün sepetten silindi!', position: 'top-left' });
	}

	getTotalPrice() {
		this.cartService.cart$.subscribe((cart) => {
			this.totalPrice = 0;

			if (cart)
				cart.items?.map((item) => {
					this.totalPrice += item.product?.price! * item.quantity!;
				});
		});
	}

	updateCartItemQuantity(value: number, cartItem: ICartItem, operation: string) {
		if (operation === '+') value++;
		else value--;

		this.cartService.setCartItem({ product: cartItem.product, quantity: value }, true);
	}

	navigateToCheckout() {
		this.router.navigateByUrl('/app/checkout');
	}

	navigateToProductDetails(productId: number) {
		this.router.navigate(['/app/products', productId]);
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
				this.deleteCartItem(productId);
			},
			reject: () => {}
		});
	}

	ngOnInit(): void {
		this.cartService.cart$.subscribe((cart) => {
			this.cartCount = cart?.items?.length ?? 0;
		});

		this.getCartList();

		this.getTotalPrice();
	}
}