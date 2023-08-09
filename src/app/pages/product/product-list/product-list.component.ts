import { Component, OnInit } from '@angular/core';
import { ProductService } from '@services/index';
import { type IProduct } from '@models/index';

@Component({
	selector: 'eb-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
	products: IProduct[] = [];
	filterModel: string = 'Default';
	searchModel: string = '';
	limit: number = 20;

	constructor(private productService: ProductService) {}

	identify(_index: number, item: IProduct) {
		return item.id;
	}

	getAllProducts() {
		this.productService.getAllProducts().subscribe((products) => {
			this.products = products;
		});
	}

	ngOnInit() {
		this.getAllProducts();
	}
}