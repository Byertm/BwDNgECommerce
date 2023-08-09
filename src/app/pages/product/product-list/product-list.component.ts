import { Component, OnInit, ViewChildren } from '@angular/core';
import { ProductService } from '@services/index';
import { type IProduct } from '@models/index';

@Component({
	selector: 'eb-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
	@ViewChildren('productContainer') filteredItems: IProduct[] = [];

	products: IProduct[] = [];
	productCategories: string[] = [];
	filterModel: string = 'Default';
	categoryModel: string = '';
	searchModel: string = '';
	limit: number = 20;

	get filteredItemsCount() {
		return this.filteredItems?.length ? this.filteredItems.length : 0;
	}

	constructor(private productService: ProductService) {}

	identify(_index: number, item: IProduct) {
		return item.id;
	}

	getAllProducts() {
		this.productService.getAllProducts().subscribe((products) => {
			this.products = products;
		});
	}

	getAllProductCategories() {
		this.productService.getAllProductCategories().subscribe((productCategories) => {
			this.productCategories = productCategories;
		});
	}

	ngOnInit() {
		this.getAllProductCategories();

		this.getAllProducts();
	}
}