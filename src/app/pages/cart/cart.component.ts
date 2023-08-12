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
	cartCount: number = 0;
	totalPrice: number = 0;
	cartList: ICartItem[] = [];

	get isCartListCount() {
		return this.cartList.length > 0;
	}

	constructor(private router: Router, private cartService: CartService, private primeToastService: PrimeToastService, private confirmationService: ConfirmationService) {}

	identify(_index: number, item: ICartItem) {
		return item.product?.id;
	}

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

		if (value === 0) this.deleteCartItem(cartItem.product?.id!);
		else this.cartService.setCartItem({ product: cartItem.product, quantity: value }, true);
	}

	navigateToCheckout() {
		this.router.navigateByUrl('/app/checkout');
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

	confirmEmptyCartList(event: Event) {
		event.preventDefault?.();

		this.confirmationService.confirm({
			target: event.target as EventTarget,
			message: 'Sepeti boşaltmak istediğinize emin misiniz?',
			icon: 'pi pi-exclamation-triangle',
			acceptLabel: 'Evet',
			rejectLabel: 'Hayır',
			accept: () => {
				this.cartService.emptyCart();
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