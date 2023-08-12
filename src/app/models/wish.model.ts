import { type IProduct } from '@models/index';

export interface IWishItem {
	product?: IProduct;
}

export interface IWishList {
	items?: IWishItem[];
}