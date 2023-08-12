import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({ providedIn: 'root' })
export class CryptoService {
	private key = '(:ErsinBiltekinBwDSuperCryptoClassInterfaceAbstractAngularCHastagOrCSharpSecretKeyWithCamelCase:)';

	encrypt(data: string) {
		try { return CryptoJS.AES.encrypt(data, this.key).toString(); }
		catch (error) {
			// console.error("ENCRYP ERROR", error);
			return null;
		}
	}

	decrypt(data: string) {
		try {
			const bytes = CryptoJS.AES.decrypt(data, this.key);
			if (!bytes) return data;

			return bytes.toString(CryptoJS.enc.Utf8);
		} catch (error) {
			// console.error("DECRYP ERROR", error);
			return null;
		}
	}
}