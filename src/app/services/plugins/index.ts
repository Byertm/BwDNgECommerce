import { CryptoService } from '@services/plugins/crypto.service';
import { ScriptLoaderService } from '@services/plugins/fileLoader.service';
import { LocalStorageService } from '@services/plugins/localStorage.service';
import { PrimeToastService } from '@services/plugins/primeToast.service';
import { WindowRef } from '@services/plugins/window.service';

const exportList = [CryptoService, ScriptLoaderService, LocalStorageService, PrimeToastService, WindowRef];

export { CryptoService, ScriptLoaderService, LocalStorageService, PrimeToastService, WindowRef };

export default exportList;