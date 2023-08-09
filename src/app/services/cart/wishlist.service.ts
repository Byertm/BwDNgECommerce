import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from './cart.service';

export interface IWishList {
	items?: IWishItem[];
}

export interface IWishItem {
	product?: any;
}

export const WISHLIST_KEY = 'wishlist';

@Injectable({ providedIn: 'root' })
export class WishlistService {
	wishList$: BehaviorSubject<IWishList> = new BehaviorSubject(this.getWishlist());

	constructor() {}

	initWishlistLocalStorage() {
		const wishProductlist: IWishList = this.getWishlist();
		if (!wishProductlist) {
			const wishListCart = { items: [] };
			const wishListCartJson = JSON.stringify(wishListCart);
			localStorage.setItem(WISHLIST_KEY, wishListCartJson);
		}
	}

	emptyCart() {
		const wishListCart = { items: [] };
		const wishListCartJson = JSON.stringify(wishListCart);
		localStorage.setItem(WISHLIST_KEY, wishListCartJson);
		this.wishList$.next(wishListCart);
	}

	getWishlist(): IWishList {
		const wishlistJsonString = localStorage.getItem(WISHLIST_KEY);
		const cart: Cart = JSON.parse(wishlistJsonString!);
		return cart;
	}

	setWishItem(cartItem: CartItem, updateCartItem?: boolean): Cart {
		const wishProductList = this.getWishlist();
		const cartItemExist = wishProductList.items?.find((item) => item.product.id === cartItem.product.id);
		if (cartItemExist) {
			wishProductList.items?.map((item) => {
				if (item.product.id === cartItem.product.id) {
					// if (updateCartItem) item.quantity = cartItem.quantity;
					// else item.quantity = item.quantity! + cartItem.quantity!;
					// return item;
				}
			});
		} else wishProductList.items?.push(cartItem);

		const cartJson = JSON.stringify(wishProductList);
		localStorage.setItem(WISHLIST_KEY, cartJson);
		this.wishList$.next(wishProductList);
		return wishProductList;
	}

	deleteWishItem(productId: string) {
		const wishProductList = this.getWishlist();
		const newWishList = wishProductList.items?.filter((item) => item.product.id !== productId);

		wishProductList.items = newWishList;

		const wishListJsonString = JSON.stringify(wishProductList);
		localStorage.setItem(WISHLIST_KEY, wishListJsonString);

		this.wishList$.next(wishProductList);
	}
}