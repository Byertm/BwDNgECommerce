import { Component, Input, OnInit } from '@angular/core';
import { type IProduct } from '@models/product.model';

@Component({
	selector: 'eb-product-item',
	templateUrl: './product-item.component.html',
	styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
	@Input() product?: IProduct;

	constructor() {}

	ngOnInit() {}
}