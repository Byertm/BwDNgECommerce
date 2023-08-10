import { Component, OnInit, ViewChildren } from '@angular/core';
import { ProductService } from '@services/index';
import { type IProduct } from '@models/index';
import { WishlistService, type IWishItem } from '@services/cart/wishlist.service';

@Component({
	selector: 'eb-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
	@ViewChildren('productContainer') filteredItems: IProduct[] = [];

	wishList: IWishItem[] = [];
	products: IProduct[] = [];
	productCategories: string[] = [];
	filterModel: string = 'Default';
	categoryModel: string = '';
	searchModel: string = '';
	limit: number = 20;

	get filteredItemsCount() {
		return this.filteredItems?.length ? this.filteredItems.length : 0;
	}

	constructor(private productService: ProductService, private wishlistService: WishlistService) {}

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

	getWishList() {
		this.wishlistService.wishList$.subscribe((cart) => {
			this.wishList = cart?.items ? cart.items : [];
		});
	}

	ngOnInit(): void {
		this.getWishList();

		this.getAllProductCategories();

		this.getAllProducts();
	}
}