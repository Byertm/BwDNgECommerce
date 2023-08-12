import { type IBaseModel } from '@models/base.model';
import { type IUser, User } from '@models/user.model';
import { LocalStorageKeys } from '@models/localStorage';
import { type ICart, ICartItem } from '@models/cart.model';
import { type IProduct, Product } from '@models/product.model';
import { type IWishItem, type IWishList } from '@models/wish.model';

const exportList: any[] = [LocalStorageKeys, Product, User];

export { type IBaseModel, LocalStorageKeys, type ICartItem, type ICart, type IProduct, Product, type IUser, User, type IWishItem, type IWishList };

export default exportList;