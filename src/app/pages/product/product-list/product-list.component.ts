import { Component, OnInit } from '@angular/core';
import { type IProduct } from '@models/index';
import { ProductService } from '@services/index';

@Component({
	selector: 'eb-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
	products: IProduct[] = [];

	constructor(private productService: ProductService) {}

	identify(index: number, item: IProduct) {
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