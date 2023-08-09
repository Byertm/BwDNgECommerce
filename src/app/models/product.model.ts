import IBaseModel from '@models/base.model';

export interface IProductRating {
	rate: number;
	count: number;
}

export interface IProduct extends IBaseModel {
	title: string;
	price: number;
	category: string;
	description: string;
	image: string;
	rating: IProductRating;
}

export class Product implements IProduct {
	id: number = 0;
	title: string = '';
	price: number = 0;
	category: string = '';
	description: string = '';
	image: string = '';
	rating: IProductRating = { count: 0, rate: 0 };
	createAt: Date = new Date();
	updateAt: Date = new Date();

	constructor(data?: IProduct) {
		if (data) {
			for (let property in data) {
				if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
			}
		}
	}

	init(data?: any) {
		if (data) {
			this.id = data['id'];
			this.title = data['title'];
			this.price = data['price'];
			this.category = data['category'];
			this.description = data['description'];
			this.image = data['image'];
			this.rating = data['rating'];
			this.createAt = data['createAt'];
			this.updateAt = data['updateAt'];
		}
	}

	static fromJS(data: any): IProduct {
		data = typeof data === 'object' ? data : {};
		let result = new Product();
		result.init(data);
		return result;
	}

	toJSON(data?: any) {
		data = typeof data === 'object' ? data : {};
		data['id'] = this.id;
		data['title'] = this.title;
		data['price'] = this.price;
		data['category'] = this.category;
		data['description'] = this.description;
		data['image'] = this.image;
		data['rating'] = this.rating;
		data['createAt'] = this.createAt;
		data['updateAt'] = this.updateAt;
		return data;
	}

	clone(): Product {
		const json = this.toJSON();
		let result = new Product();
		result.init(json);
		return result;
	}
}

export default Product;