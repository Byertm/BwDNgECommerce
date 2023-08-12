import { Injectable } from '@angular/core';
import { type IProduct } from '@models/product.model';
import { LocalStorageService } from '@services/plugins';
import { LocalStorageUnionKeys } from '@services/plugins/localStorage.service';
// import { Cart, type ICart, Product, type IProduct } from '@models/index';
import { BehaviorSubject } from 'rxjs';

export interface ICart {
	items?: ICartItem[];
}

export interface ICartItem {
	product?: IProduct;
	quantity?: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
	cart$: BehaviorSubject<ICart> = new BehaviorSubject(this.getCart());

	private cartKeyFromLS: LocalStorageUnionKeys = 'cart';

	constructor(private localStorageService: LocalStorageService) { }

	initCartLocalStorage() {
		const cart: ICart = this.getCart();
		if (!cart) {
			const intialCart = { items: [] };
			const intialCartJson = JSON.stringify(intialCart);
			this.localStorageService.set({ key: this.cartKeyFromLS, value: intialCartJson });
		}
		this.cart$.next(cart);
	}

	emptyCart() {
		const intialCart = { items: [] };
		const intialCartJson = JSON.stringify(intialCart);
		this.localStorageService.set({ key: this.cartKeyFromLS, value: intialCartJson });
		this.cart$.next(intialCart);
	}

	getCart(): ICart {
		const cart: ICart = this.localStorageService.getWithParse(this.cartKeyFromLS);
		return cart;
	}

	setCartItem(cartItem: ICartItem, updateCartItem?: boolean): ICart {
		const cart = this.getCart();
		const cartItemExist = cart?.items?.find((item) => item.product?.id === cartItem?.product?.id);
		if (cartItemExist) {
			cart.items?.map((item) => {
				if (item.product?.id === cartItem.product?.id) {
					if (updateCartItem) item.quantity = cartItem.quantity;
					else item.quantity = item.quantity! + cartItem.quantity!;
					// return item;
				}
			});
		} else cart.items?.push(cartItem);

		const cartJson = JSON.stringify(cart);
		this.localStorageService.set({ key: this.cartKeyFromLS, value: cartJson });
		this.cart$.next(cart);
		return cart;
	}

	deleteCartItem(productId: number) {
		const cart = this.getCart();
		const newCart = cart.items?.filter((item) => item.product?.id !== productId);

		cart.items = newCart;

		const cartJsonString = JSON.stringify(cart);
		this.localStorageService.set({ key: this.cartKeyFromLS, value: cartJsonString });

		this.cart$.next(cart);
	}
}