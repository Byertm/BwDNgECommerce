import { AuthGuard } from '@services/auth/auth.guard';
import { AuthService } from '@services/auth/auth.service';
import { OnOffService } from '@services/common/on-off.service';
import { ProductService } from '@services/product/product.service';

const exportList = [AuthGuard, AuthService, OnOffService, ProductService];

export { AuthGuard, AuthService, OnOffService, ProductService };

export default exportList;