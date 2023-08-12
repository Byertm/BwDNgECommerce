import { CartComponent } from '@pages/cart/cart.component';
import { WishlistComponent } from '@pages/wishlist/wishlist.component';
import { ErrorPageComponent } from '@pages/error-page/error-page.component';
import { ProductListComponent, ProductDetailComponent } from '@pages/product';

const exportList = [CartComponent, ErrorPageComponent, ProductListComponent, ProductDetailComponent, WishlistComponent];

export { CartComponent, ErrorPageComponent, ProductListComponent, ProductDetailComponent, WishlistComponent };

export default exportList;