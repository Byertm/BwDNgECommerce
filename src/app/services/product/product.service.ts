import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { BaseService } from '@services/common/base.service';

import { LocalStorageUnionKeys } from '@services/plugins/localStorage.service';
// import { LocalStorageService } from '@services/plugins';
import { type IProduct, Product } from '@models/product.model';

// import { ConfirmationService } from 'primeng/api';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class ProductService extends BaseService {
	private productSubject = new BehaviorSubject<IProduct>(new Product());
	private product = this.productSubject.asObservable();

	private productsSubject = new BehaviorSubject<Array<IProduct>>([] as IProduct[]);
	private products = this.productsSubject.asObservable();

	private allProductCategoriesSubject = new BehaviorSubject<Array<string>>([] as string[]);
	private allProductCategories = this.allProductCategoriesSubject.asObservable();

	private productKeyFromLocalStorage: LocalStorageUnionKeys = 'product';

	constructor(public override http: HttpClient) {
		super(http);
	}
	// constructor(public http: HttpClient, public toast: ToastService, private auth: AuthService) { super(http, toast); }
	// private confirmationService: ConfirmationService, private localStorageService: LocalStorageService

	getProduct(productId: number | string): Observable<IProduct> {
		// return this.product;
		return this.getData(`products/${productId}`, {});
	}

	getAllProducts(): Observable<Array<IProduct>> {
		// return this.products;
		// return this.http.get<Array<IProduct>>('products');
		return this.getData('products', {});
	}

	getProductsWithSort(): Observable<Array<IProduct>> {
		// return this.products;
		return this.getData('products', {});
	}

	getProductsWithCategory(): Observable<Array<IProduct>> {
		// return this.products;
		return this.getData('products/categories', {});
	}

	getAllProductCategories(pCategoryId: number | string): Observable<Array<string>> {
		// return this.allProductCategories;
		return this.getData(`products/category/${pCategoryId}`, {});
	}

	addProduct() {
		fetch('https://fakestoreapi.com/products', {
			method: 'POST',
			body: JSON.stringify({
				title: 'test product',
				price: 13.5,
				description: 'lorem ipsum set',
				image: 'https://i.pravatar.cc',
				category: 'electronic'
			})
		})
			.then((res) => res.json())
			.then((json) => console.log(json));
	}

	updateProduct() {
		fetch('https://fakestoreapi.com/products/7', {
			method: 'PUT',
			body: JSON.stringify({
				title: 'test product',
				price: 13.5,
				description: 'lorem ipsum set',
				image: 'https://i.pravatar.cc',
				category: 'electronic'
			})
		})
			.then((res) => res.json())
			.then((json) => console.log(json));
		fetch('https://fakestoreapi.com/products/7', {
			method: 'PATCH',
			body: JSON.stringify({
				title: 'test product',
				price: 13.5,
				description: 'lorem ipsum set',
				image: 'https://i.pravatar.cc',
				category: 'electronic'
			})
		})
			.then((res) => res.json())
			.then((json) => console.log(json));
	}

	deleteProduct() {
		fetch('https://fakestoreapi.com/products/6', {
			method: 'DELETE'
		})
			.then((res) => res.json())
			.then((json) => console.log(json));
	}
}