import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrimeToastService } from '@services/plugins';
import { ProductService } from '@services/index';
import { Product, type IProduct } from '@models/index';

@Component({
	selector: 'eb-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
	backgroundPos: string = 'center center';

	product: IProduct = new Product();
	productId!: number;
	category: string = '';
	productTitle: string = '';
	imgNotFounded: boolean = false;
	quantity!: number;
	loremText: string = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, quos aspernatur eum dolorr eprehenderit eos et libero debitis itaque voluptatem! Laudantium modi sequi, id numquam liberosed quaerat. Eligendi, ipsum!`;
	categoryRelatedProducts: IProduct[] = [];
	isProductInWishList: boolean = false;
	productInCartList: any;

	constructor(
		private _route: ActivatedRoute,
		// private cartService: CartService,
		private productService: ProductService,
		// private productService: ProductService,
		private primeToastService: PrimeToastService
	) {}

	identify(_index: number, item: IProduct) {
		return item.id;
	}

	imageZoom(event: any) {
		const { left, top, width, height } = event.target.getBoundingClientRect();
		const x = ((event.pageX - left) / width) * 100;
		const y = ((event.pageY - top) / height) * 100;
		this.backgroundPos = `${x}% ${y}%`;
	}

	// checkProductInCartList(product: any) {
	// 	const cartItemExist = this.cartList.find((item) => item.product.id === product.id);
	// 	this.quantity = cartItemExist?.quantity || 0;
	// 	return cartItemExist;
	// }

	getProductsByCategory(category: string) {
		this.productService.getProductsWithCategory(category).subscribe((data) => {
			this.categoryRelatedProducts = data.filter((item) => item.id !== this.product.id);
		});
	}

	getProduct() {
		this.productService.getProduct(this.productId).subscribe((data) => {
			this.product = data;
			const substringLength: number = 100;
			this.productTitle = this.product.title.length > substringLength ? `${this.product.title.substring(0, substringLength)}...` : this.product.title;
			this.category = data.category;
			this.getProductsByCategory(this.category);
			// this.productInCartList = this.checkProductInCartList(data);
			// this.isProductInWishList = this.productInWishList(data);
			// if (data.images.length == 1) this.imgNotFounded = true;
		});
	}

	// getCartList() {
	// 	this._cartService.cart$.subscribe((cart) => {
	// 		this.cartList = cart.items!;
	// 		if (this.product) {
	// 			this.productInCartList = this.checkProductInCartList(this.product);
	// 		}
	// 	});
	// }

	updateCartItemQuantity(value: number, product: any, operation: string) {
		if (operation === '+') value++;
		else value--;

		// this._cartService.setCartItem({ product: product, quantity: value }, true);
	}

	addProductToCart(item: IProduct) {
		alert(`addProductToCart ${JSON.stringify(item)}`);
		// const cartItem: CartItem = { product: item, quantity: 1 };
		// this.cartService.setCartItem(cartItem);
		this.primeToastService.success({ summary: 'Ürün başarıyla sepete eklendi!', position: 'top-left' });
	}

	addProductToWishList(item: IProduct) {
		alert(`addProductToWishList ${JSON.stringify(item)}`);
	}

	ngOnInit(): void {
		this._route.params.subscribe((params) => {
			this.productId = params['id'];
			this.getProduct();
			// this.getCartList();
		});
	}
}