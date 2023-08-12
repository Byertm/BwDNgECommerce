import { type IProduct } from '@models/index';

export interface ICartItem {
	product?: IProduct;
	quantity?: number;
}

export interface ICart {
	items?: ICartItem[];
}