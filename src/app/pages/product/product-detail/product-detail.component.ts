import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, type Params } from '@angular/router';
import { PrimeToastService } from '@services/plugins';
import { ProductService } from '@services/index';
import { Product, type IProduct } from '@models/index';
import { CartService, type ICartItem } from '@services/cart/cart.service';
import { type IWishItem, WishlistService } from '@services/cart/wishlist.service';

@Component({
	selector: 'eb-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
	backgroundPos: string = 'center center';

	product: IProduct = new Product();
	productId: number = 0;
	category: string = '';
	productTitle: string = '';
	imgNotFounded: boolean = false;
	quantity: number = 0;
	loremText: string = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, quos aspernatur eum dolorr eprehenderit eos et libero debitis itaque voluptatem! Laudantium modi sequi, id numquam liberosed quaerat. Eligendi, ipsum!`;
	categoryRelatedProducts: IProduct[] = [];
	isProductInWishList: boolean = false;
	productInCartList: any;

	cartList: ICartItem[] = [];
	wishList: IWishItem[] = [];

	get isProductSale() {
		return this.product ? this.product?.id % 3 === 0 : false;
	}

	constructor(
		private route: ActivatedRoute,
		private cartService: CartService,
		private productService: ProductService,
		private wishlistService: WishlistService,
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

	checkProductInCartList(product: IProduct) {
		const cartItemExist = this.cartList.find((item) => item?.product?.id === product.id);
		this.quantity = cartItemExist?.quantity || 0;
		return cartItemExist;
	}

	getProductsByCategory(category: string) {
		this.productService.getProductsWithCategory(category).subscribe((data) => {
			if (!!data) this.categoryRelatedProducts = data.filter((item) => item.id !== this.product.id);
		});
	}

	productInWishList(product: IProduct) {
		const WishItemExist = this.wishList.some((item) => item.product?.id === product.id);
		return WishItemExist;
	}

	getProduct() {
		this.productService.getProduct(this.productId).subscribe((data) => {
			this.product = data;
			const substringLength: number = 60;
			this.productTitle = this.product.title.length > substringLength ? `${this.product.title.substring(0, substringLength)}...` : this.product.title;
			this.category = data.category;

			this.getProductsByCategory(this.category);

			this.productInCartList = this.checkProductInCartList(data);

			this.isProductInWishList = this.productInWishList(data);
			// if (data.images.length === 1) this.imgNotFounded = true;
		});
	}

	getCartList() {
		this.cartService.cart$.subscribe((cart) => {
			this.cartList = cart?.items ? cart.items : [];

			if (this.product) this.productInCartList = this.checkProductInCartList(this.product);
		});
	}

	getWishList() {
		this.wishlistService.wishList$.subscribe((wishlist) => {
			this.wishList = wishlist?.items ? wishlist.items : [];

			if (this.product) this.isProductInWishList = this.productInWishList(this.product);
		});
	}

	deleteCartItem(pProductId: number) {
		this.cartService.deleteCartItem(pProductId);

		this.primeToastService.error({ summary: 'Ürün sepetten silindi!', position: 'top-left' });
	}

	updateCartItemQuantity(value: number, product: IProduct, operation: string) {
		if (operation === '+') value++;
		else value--;

		if (value === 0) this.deleteCartItem(product.id);
		else this.cartService.setCartItem({ product: product, quantity: value }, true);
	}

	addProductToCart(pProduct: IProduct) {
		const cartItem: ICartItem = { product: pProduct, quantity: 1 };
		this.cartService.setCartItem(cartItem);
		this.primeToastService.success({ summary: 'Ürün başarıyla sepete eklendi!', position: 'top-left' });
	}

	addProductToWishList(item: IProduct) {
		const wishItem: IWishItem = { product: item };
		if (this.isProductInWishList) {
			this.wishlistService.deleteWishItem(wishItem.product?.id);
			this.primeToastService.success({ summary: 'Ürün başarıyla istek listesinden çıkartıldı!', position: 'top-left' });
		} else {
			this.wishlistService.setWishItem(wishItem);
			this.primeToastService.success({ summary: 'Ürün başarıyla istek listesine eklendi!', position: 'top-left' });
		}
	}

	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			this.productId = parseInt(params['id'], 10);

			this.getProduct();

			this.getCartList();

			this.getWishList();
		});
	}
}