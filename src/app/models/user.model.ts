import IBaseModel from '@models/base.model';

export interface IFullName {
	firstname: string;
	lastname: string;
}

export interface IGeolocation {
	lat: string;
	long: string;
}

export interface IAddress {
	city: string;
	street: string;
	number: number;
	zipcode: string;
	geolocation: IGeolocation;
}

export interface IUser extends IBaseModel {
	email: string;
	username: string;
	password: string;
	description: string;
	name: IFullName;
	address: IAddress;
	phone: string;
	__v: number;
}

export type UserInput = Pick<IUser, 'username' | 'password'>;
export type UserInputEmail = Pick<IUser, 'email' | 'password'>;
export type UserOutput = Omit<IUser, '__v' | 'password'>;

export class User implements IUser {
	id: number = 0;
	email: string = '';
	username: string = '';
	password: string = '';
	description: string = '';
	name: IFullName = { firstname: '', lastname: '' };
	address: IAddress = { city: '', street: '', number: 0, zipcode: '', geolocation: { lat: '', long: '' } };
	phone: string = '';
	createAt: Date = new Date();
	updateAt: Date = new Date();
	__v: number = 0;

	constructor(data?: IUser) {
		if (data) {
			for (let property in data) {
				if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
			}
		}
	}

	init(data?: any) {
		if (data) {
			this.id = data['id'];
			this.email = data['email'];
			this.username = data['username'];
			this.password = data['password'];
			this.name = data['name'];
			this.address = data['address'];
			this.phone = data['phone'];
			this.createAt = data['createAt'];
			this.updateAt = data['updateAt'];
			this.__v = data['__v'];
		}
	}

	static fromJS(data: any): IUser {
		data = typeof data === 'object' ? data : {};
		let result = new User();
		result.init(data);
		return result;
	}

	toJSON(data?: any) {
		data = typeof data === 'object' ? data : {};
		data['id'] = this.id;
		data['email'] = this.email;
		data['username'] = this.username;
		data['password'] = this.password;
		data['name'] = this.name;
		data['address'] = this.address;
		data['phone'] = this.phone;
		data['createAt'] = this.createAt;
		data['updateAt'] = this.updateAt;
		data['__v'] = this.__v;
		return data;
	}

	clone(): User {
		const json = this.toJSON();
		let result = new User();
		result.init(json);
		return result;
	}
}

export default User;