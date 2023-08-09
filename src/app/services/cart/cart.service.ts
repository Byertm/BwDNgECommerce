import { Injectable } from '@angular/core';
import { LocalStorageService } from '@services/plugins';
import { LocalStorageUnionKeys } from '@services/plugins/localStorage.service';
// import { Cart, type ICart, Product, type IProduct } from '@models/index';
import { BehaviorSubject } from 'rxjs';

export class Cart {
	items?: CartItem[];
}

export class CartItem {
	product?: any;
	quantity?: number;
}

export class CartItemDetailed {
	product?: any;
	quantity?: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
	cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

	private cartKeyFromLocalStorage: LocalStorageUnionKeys = 'cart';

	constructor(private localStorageService: LocalStorageService) {}

	initCartLocalStorage() {
		const cart: Cart = this.getCart();
		if (!cart) {
			const intialCart = { items: [] };
			const intialCartJson = JSON.stringify(intialCart);
			this.localStorageService.set({ key: this.cartKeyFromLocalStorage, value: intialCartJson });
		}
	}

	emptyCart() {
		const intialCart = { items: [] };
		const intialCartJson = JSON.stringify(intialCart);
		this.localStorageService.set({ key: this.cartKeyFromLocalStorage, value: intialCartJson });
		this.cart$.next(intialCart);
	}

	getCart(): Cart {
		const cart: Cart = this.localStorageService.getWithParse(this.cartKeyFromLocalStorage);
		return cart;
	}

	setCartItem(cartItem: CartItem, updateCartItem?: boolean): Cart {
		const cart = this.getCart();
		const cartItemExist = cart.items?.find((item) => item.product.id === cartItem.product.id);
		if (cartItemExist) {
			cart.items?.map((item) => {
				if (item.product.id === cartItem.product.id) {
					if (updateCartItem) item.quantity = cartItem.quantity;
					else item.quantity = item.quantity! + cartItem.quantity!;
					// return item;
				}
			});
		} else cart.items?.push(cartItem);

		const cartJson = JSON.stringify(cart);
		this.localStorageService.set({ key: this.cartKeyFromLocalStorage, value: cartJson });
		this.cart$.next(cart);
		return cart;
	}

	deleteCartItem(productId: string) {
		const cart = this.getCart();
		const newCart = cart.items?.filter((item) => item.product.id !== productId);

		cart.items = newCart;

		const cartJsonString = JSON.stringify(cart);
		this.localStorageService.set({ key: this.cartKeyFromLocalStorage, value: cartJsonString });

		this.cart$.next(cart);
	}
}