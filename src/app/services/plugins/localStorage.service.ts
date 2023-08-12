import { Injectable } from '@angular/core';
import { LocalStorageKeys } from '@models/localStorage';
import { CryptoService } from '@services/plugins';

type TKeys = `${LocalStorageKeys}`;

type SetData<T> = { key: TKeys; value: T };

export type LocalStorageUnionKeys = TKeys;

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
	constructor(private cryptoService: CryptoService) { }

	protected clear(): void { localStorage.clear(); }

	key(index: number): string | null { return localStorage.key(index); }

	length(): number { return localStorage.length; }

	get(key: TKeys): string | null {
		const lsData = localStorage.getItem(key);
		if (!lsData) return null;

		const decryptedData = this.cryptoService.decrypt(lsData);
		if (!decryptedData) return lsData;

		return decryptedData;
	}

	getWithParse(key: TKeys): any { const getData = this.get(key) || 'null'; return JSON.parse(getData); }

	set({ key, value }: SetData<string>): void {
		const encryptedValue = this.cryptoService.encrypt(value);
		if (!encryptedValue) return;

		localStorage.setItem(key, encryptedValue);
	}

	setBasic(key: TKeys, value: string): void {
		const encryptedValue = this.cryptoService.encrypt(value);
		if (!encryptedValue) return;

		localStorage.setItem(key, encryptedValue);
	}

	setWithStringfyForData({ key, value: _value }: SetData<any>): void { this.set({ key, value: JSON.stringify(_value) }); }

	setBasicWithStringfyForData(key: TKeys, _value: any): void { this.setBasic(key, JSON.stringify(_value)); }

	setWithModel(data: SetData<any>): void { let { key, value } = data; this.setBasic(key, JSON.stringify(value)); }

	remove(key: TKeys) { localStorage.removeItem(key); }
}