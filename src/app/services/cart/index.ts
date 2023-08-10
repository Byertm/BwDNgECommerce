import { CartService } from '@services/cart/cart.service';
import { WishlistService } from '@services/cart/wishlist.service';

const exportList = [CartService, WishlistService];

export { CartService, WishlistService };

export default exportList;