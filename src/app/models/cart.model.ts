import IBaseModel from '@models/base.model';
import { Product, type IProduct } from '@models/index';

export interface ICartProduct {
	product?: IProduct;
	productId: number;
	quantity: number;
}

export interface ICart extends IBaseModel {
	userId: number;
	date: Date;
	products: Array<ICartProduct>;
	__v: number;
}

export class Cart implements ICart {
	id: number = 0;
	userId: number = 0;
	date: Date = new Date();
	products: Array<ICartProduct> = [];
	createAt: Date = new Date();
	updateAt: Date = new Date();
	__v: number = 0;

	constructor(data?: ICart) {
		if (data) {
			for (let property in data) {
				if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
			}
		}
	}

	init(data?: any) {
		if (data) {
			this.id = data['id'];
			this.userId = data['userId'];
			this.date = data['date'];
			this.products = data['products'];
			this.createAt = data['createAt'];
			this.updateAt = data['updateAt'];
			this.__v = data['__v'];
		}
	}

	static fromJS(data: any): ICart {
		data = typeof data === 'object' ? data : {};
		let result = new Cart();
		result.init(data);
		return result;
	}

	toJSON(data?: any) {
		data = typeof data === 'object' ? data : {};
		data['id'] = this.id;
		data['userId'] = this.userId;
		data['date'] = this.date;
		data['products'] = this.products;
		data['createAt'] = this.createAt;
		data['updateAt'] = this.updateAt;
		data['__v'] = this.__v;
		return data;
	}

	clone(): Cart {
		const json = this.toJSON();
		let result = new Cart();
		result.init(json);
		return result;
	}
}

export default Cart;