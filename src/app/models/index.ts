import { type IBaseModel } from '@models/base.model';
import { type ICart, Cart } from '@models/cart.model';
import { type IProduct, Product } from '@models/product.model';
import { type IUser, User } from '@models/user.model';

const exportList: any[] = [Cart, Product, User];

export { type IBaseModel, type ICart, Cart, type IProduct, Product, type IUser, User };

export default exportList;