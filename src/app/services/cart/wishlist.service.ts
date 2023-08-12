import { Injectable } from '@angular/core';
// import { type ICart } from '@models/index';
// import { type ICart } from '@models/cart.model';
import { type IProduct } from '@models/product.model';
import { LocalStorageService } from '@services/plugins';
import { ICart, ICartItem } from '@services/cart/cart.service';
import { LocalStorageUnionKeys } from '@services/plugins/localStorage.service';
import { BehaviorSubject } from 'rxjs';

export interface IWishList {
	items?: IWishItem[];
}

export interface IWishItem {
	product?: IProduct;
}

@Injectable({ providedIn: 'root' })
export class WishlistService {
	wishList$: BehaviorSubject<IWishList> = new BehaviorSubject(this.getWishlist());

	private wishlistKeyFromLS: LocalStorageUnionKeys = 'wishlist';

	constructor(private localStorageService: LocalStorageService) {}

	getWishlist(): IWishList {
		const wishlistJsonString = this.localStorageService.get(this.wishlistKeyFromLS);
		const cart: ICart = JSON.parse(wishlistJsonString!);
		return cart;
	}

	initWishlistLocalStorage() {
		const wishlist: IWishList = this.getWishlist();
		if (!wishlist) {
			const wishListCart = { items: [] };
			const wishListCartJson = JSON.stringify(wishListCart);
			this.localStorageService.setBasic(this.wishlistKeyFromLS, wishListCartJson);
		}
		this.wishList$.next(wishlist);
	}

	emptyCart() {
		const wishListCart = { items: [] };
		const wishListCartJson = JSON.stringify(wishListCart);
		this.localStorageService.setBasic(this.wishlistKeyFromLS, wishListCartJson);
		this.wishList$.next(wishListCart);
	}

	setWishItem(cartItem: ICartItem, updateCartItem?: boolean): ICart {
		const wishProductList = this.getWishlist();
		const cartItemExist = wishProductList?.items?.find((item) => item.product?.id === cartItem?.product?.id);
		if (cartItemExist) {
			wishProductList.items?.map((item) => {
				if (item.product?.id === cartItem?.product?.id) {
					// if (updateCartItem) item.quantity = cartItem.quantity;
					// else item.quantity = item.quantity! + cartItem.quantity!;
					// return item;
				}
			});
		} else wishProductList.items?.push(cartItem);

		const cartJson = JSON.stringify(wishProductList);
		this.localStorageService.setBasic(this.wishlistKeyFromLS, cartJson);
		this.wishList$.next(wishProductList);
		return wishProductList;
	}

	deleteWishItem(productId?: number) {
		const wishProductList = this.getWishlist();
		const newWishList = wishProductList.items?.filter((item) => item.product?.id !== productId);

		wishProductList.items = newWishList;

		const wishListJsonString = JSON.stringify(wishProductList);
		this.localStorageService.setBasic(this.wishlistKeyFromLS, wishListJsonString);

		this.wishList$.next(wishProductList);
	}
}