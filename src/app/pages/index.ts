import { CartComponent } from '@pages/cart/cart.component';
import { ErrorPageComponent } from '@pages/error-page/error-page.component';
import { ProductListComponent, ProductDetailComponent } from '@pages/product';

const exportList = [CartComponent, ErrorPageComponent, ProductListComponent, ProductDetailComponent];

export { CartComponent, ErrorPageComponent, ProductListComponent, ProductDetailComponent };

export default exportList;