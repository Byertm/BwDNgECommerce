import { Component, Input, OnInit } from '@angular/core';
import { type IProduct } from '@models/product.model';
import { type ICartItem, CartService } from '@services/cart/cart.service';
import { type IWishItem, WishlistService } from '@services/cart/wishlist.service';
import { PrimeToastService } from '@services/plugins';
import { ProductService } from '@services/index';

@Component({
	selector: 'eb-product-item',
	templateUrl: './product-item.component.html',
	styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
	@Input() product?: IProduct;

	@Input() wishList: IWishItem[] = [];

	get isProductSale() {
		return this.product ? this.product?.id % 3 === 0 : false;
	}

	constructor(private cartService: CartService, private productService: ProductService, private wishlistService: WishlistService, private primeToastService: PrimeToastService) {}

	addProductToWishList(item: any, event: any) {
		const wishItem: IWishItem = { product: item };
		if (event.currentTarget.classList.contains('is-favourite')) {
			event.currentTarget.classList.remove('is-favourite');
			this.wishlistService.deleteWishItem(wishItem.product.id);
			this.primeToastService.error({ summary: 'Ürün istek listesinden kaldırıldı!', position: 'top-left' });
		} else {
			event.currentTarget.classList.add('is-favourite');
			this.wishlistService.setWishItem(wishItem);
			this.primeToastService.success({ summary: 'Ürün istek listesine eklendi!', position: 'top-left' });
		}
	}

	addProductToCart(item: any) {
		const cartItem: ICartItem = { product: item, quantity: 1 };
		this.cartService.setCartItem(cartItem);
		this.primeToastService.success({ summary: 'Ürün başarıyla sepete eklendi!', position: 'top-left' });
	}

	productInWishList(pItem: any) {
		const cartItemExist = this.wishList.find((item) => item.product.id === pItem.id);
		return cartItemExist;
	}

	ngOnInit(): void {}
}