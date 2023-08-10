import { Injectable } from '@angular/core';

import { BaseService } from '@services/common/base.service';

import { type IProduct, Product } from '@models/product.model';

import { Observable, BehaviorSubject } from 'rxjs';

const placeholderImageAddress: string = 'https://i.pravatar.cc/';

@Injectable({ providedIn: 'root' })
export class ProductService extends BaseService {
	private productSubject = new BehaviorSubject<IProduct>(new Product());
	private product = this.productSubject.asObservable();

	private productsSubject = new BehaviorSubject<Array<IProduct>>([] as IProduct[]);
	private products = this.productsSubject.asObservable();

	private productsWithCategorySubject = new BehaviorSubject<Array<IProduct>>([] as IProduct[]);
	private productsWithCategory = this.productsWithCategorySubject.asObservable();

	private allProductCategoriesSubject = new BehaviorSubject<Array<string>>([] as string[]);
	private allProductCategories = this.allProductCategoriesSubject.asObservable();

	// private productKeyFromLS: LocalStorageUnionKeys = 'product';

	getProduct(productId: number | string): Observable<IProduct> {
		if (this.productSubject.getValue()?.id <= 0 || this.productSubject.getValue()?.id !== productId)
			this.getData(`products/${productId}`, {}).subscribe((product) => {
				this.productSubject.next(product);
			});

		return this.product;
	}

	getAllProducts(pLimit: number = 20, pSort: 'asc' | 'desc' = 'desc'): Observable<Array<IProduct>> {
		if (this.productsSubject.getValue().length <= 0)
			this.getData(`products?limit=${pLimit}&sort=${pSort}`, {}).subscribe((products) => {
				this.productsSubject.next(products);
			});

		return this.products;
	}

	getProductsWithSort(pSort: 'asc' | 'desc' = 'desc'): Observable<Array<IProduct>> {
		if (this.productsSubject.getValue().length <= 0)
			this.getData(`products?sort=${pSort}`, {}).subscribe((products) => {
				this.productsSubject.next(products);
			});

		return this.products;
	}

	getProductsWithCategory(pCategoryName: string): Observable<Array<IProduct>> {
		if (!!pCategoryName && (this.productsWithCategorySubject.getValue().length <= 0 || this.productsWithCategorySubject.getValue()?.[0]?.category !== pCategoryName))
			this.getData(`products/category/${pCategoryName}`, {}).subscribe((products) => {
				this.productsWithCategorySubject.next(products);
			});

		return this.productsWithCategory;
	}

	getAllProductCategories(): Observable<Array<string>> {
		if (this.allProductCategoriesSubject.getValue().length <= 0)
			this.getData(`products/categories`, {}).subscribe((productCategories) => {
				this.allProductCategoriesSubject.next(productCategories);
			});

		return this.allProductCategories;
	}

	addProduct(pProduct: IProduct) {
		const postModel = JSON.stringify({
			title: pProduct.title,
			price: pProduct.price,
			description: pProduct.description,
			image: placeholderImageAddress,
			category: pProduct.category
		});

		this.postData(`products`, postModel).subscribe((newProduct: IProduct) => {
			this.productsSubject.next([...this.productsSubject.getValue(), newProduct] as IProduct[]);
		});
	}

	updateProduct(pProduct: IProduct, pUpdateType: 'put' | 'patch' = 'patch') {
		if (pUpdateType === 'patch') {
			const patchModel = JSON.stringify({
				title: pProduct.title,
				price: pProduct.price,
				description: pProduct.description,
				image: placeholderImageAddress,
				category: pProduct.category
			});

			this.patchData(`products/${pProduct.id}`, patchModel).subscribe((updatedProduct: IProduct) => {
				this.productsSubject.next([...this.productsSubject.getValue().filter((product) => product.id !== pProduct.id), updatedProduct] as IProduct[]);
			});
		} else {
			const putModel = JSON.stringify({
				title: pProduct.title,
				price: pProduct.price,
				description: pProduct.description,
				image: placeholderImageAddress,
				category: pProduct.category
			});

			this.putData(`products/${pProduct.id}`, putModel).subscribe((updatedProduct: IProduct) => {
				this.productsSubject.next([...this.productsSubject.getValue().filter((product) => product.id !== pProduct.id), updatedProduct] as IProduct[]);
			});
		}
	}

	deleteProduct(pProductId: number | string) {
		this.deleteData(`products/${pProductId}`, {}).subscribe((result: boolean) => {
			if (result) this.productsSubject.next([...this.productsSubject.getValue().filter((product) => product.id !== pProductId)] as IProduct[]);
		});
	}
}