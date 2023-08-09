import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { LocalStorageUnionKeys } from '@services/plugins/localStorage.service';
import { LocalStorageService } from '@services/plugins';

import { ConfirmationService } from 'primeng/api';
import { Observable, BehaviorSubject } from 'rxjs';
import { Cart, type ICart, Product, type IProduct } from '@models/index';

@Injectable()
export class BasketService {
	private cartSubject = new BehaviorSubject<ICart>(new Cart());
	private cart = this.cartSubject.asObservable();

	private quantitySubject = new BehaviorSubject(0);
	private quantity = this.quantitySubject.asObservable();

	private subTotalSubject = new BehaviorSubject(0);
	private subTotal = this.subTotalSubject.asObservable();

	private cartKeyFromLocalStorage: LocalStorageUnionKeys = 'cart';

	constructor(private confirmationService: ConfirmationService, private localStorageService: LocalStorageService) {
		this.initialize();
	}

	initialize() {
		const localCart = this.localStorageService.get(this.cartKeyFromLocalStorage);
		if (localCart) {
			let currentCart = this.cartSubject.getValue();
			currentCart = JSON.parse(this.localStorageService.get(this.cartKeyFromLocalStorage) || '');

			this.cartSubject.next(currentCart);

			const currentCartQuantity = currentCart.products.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
			// const currentCartSubTotal = currentCart.products.reduce((previousValue, currentValue) => previousValue + parseFloat(currentValue.price) * 1, 0);

			this.quantitySubject.next(currentCartQuantity);
			// this.subTotalSubject.next(currentCartSubTotal);
		}
	}

	getCart(): Observable<ICart> {
		this.initialize();
		return this.cart;
	}

	getCartDataFromLocalStorage(): ICart {
		let cartJson = this.localStorageService.get(this.cartKeyFromLocalStorage);

		let cart: Cart = JSON.parse(cartJson!);

		return cart;
	}

	getSubTotalValue() {
		return this.subTotalSubject.getValue();
	}

	getQuantity(): Observable<number> {
		return this.quantity;
	}

	getSubTotal(): Observable<number> {
		return this.subTotal;
	}

	deleteItem(product: IProduct) {
		const cart = this.cartSubject.getValue();
		let deletedProductIndex = cart.products.findIndex((x) => x.productId === product.id);

		if (deletedProductIndex >= 0) {
			cart.products.splice(deletedProductIndex, 1);

			if (cart.products.length === 0) this.emptyBag();
			else this.buildCart(cart);
		}
	}

	deleteItemConfirm(product: Product) {
		const confirmationOptions: object = {
			header: 'Ürün Silme Onayı',
			message: 'Bu ürün kaydını silmek istiyor musunuz?',
			icon: 'pi pi-info-circle',
			accept: () => this.deleteItem(product)
		};
		this.confirmationService.confirm(confirmationOptions);
	}

	getCartSubject(): ICart {
		return this.cartSubject.getValue();
	}

	emptyBag() {
		const cart = this.cartSubject.getValue();
		cart.id = 0;
		cart.userId = 0;
		cart.products = [];
		cart.date = new Date();
		cart.updateAt = new Date();
		this.buildCart(cart);
	}

	buildCart(cart: ICart) {
		const quantity = cart.products.reduce((pVal, cVal) => pVal + cVal.quantity, 0);
		// const subTotal = cart.products.reduce((pVal, cVal) => pVal + parseFloat(cVal.price), 0);

		// Sepetin ürün adeti ve toplam fiyatı 0'a eşitse işlem yapılabilir.
		// if (cart.quantity === 0 && cart.subTotal === 0) { }

		this.localStorageService.set({ key: 'cart', value: JSON.stringify(cart) });

		this.quantitySubject.next(quantity);
		// this.subTotalSubject.next(subTotal);
		this.cartSubject.next(cart);
		// this.localStorageService.set({ key: 'Cart', value: JSON.stringify(cart) });
	}
}