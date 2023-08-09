// import { AuthService } from '@services/auth/auth.service';
import { OnOffService } from '@services/common/on-off.service';
import { ProductService } from '@services/product/product.service';

const exportList = [OnOffService, ProductService];

export { OnOffService, ProductService };

export default exportList;