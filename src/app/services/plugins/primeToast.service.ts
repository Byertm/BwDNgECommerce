import { Injectable } from '@angular/core';
import { LocalStorageService } from '@services/plugins';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageUnionKeys } from '@services/plugins/localStorage.service';
import { MessageService, type Message } from 'primeng/api';

export const PN_TITLE = 'ErsinBiltekinECommerce';
export const PN_ICON = 'assets/images/favicon/favicon-96x96.png';

export enum IToastTypeModel {
	Info = 'info',
	Error = 'error',
	Default = 'default',
	Success = 'success',
	Warning = 'warning'
}

export enum IToastPositionModel {
	TopLeft = 'top-left', // "topLeft"
	TopCenter = 'top-center', // "topCenter"
	TopRight = 'top-right', // "topRight"
	CenterLeft = 'center-left', // "centerLeft"
	CenterCenter = 'center', // "center"
	Center = 'center', // "center"
	CenterRight = 'center-right', // "default"
	BottomLeft = 'bottom-left', // "bottomLeft"
	BottomCenter = 'bottom-center', // "bottomCenter"
	BottomRight = 'bottom-right' // "bottomRight
}

type TToastPosition = `${IToastPositionModel}`;

export interface IToastModel extends Message {
	position?: TToastPosition;
}

@Injectable({ providedIn: 'root' })
export class PrimeToastService {
	private toastSubject = new BehaviorSubject<IToastModel>({} as IToastModel);
	private toast = this.toastSubject.asObservable();

	private toastListKeyFromLocalStorage: LocalStorageUnionKeys = 'toastList';

	constructor(private messageService: MessageService, private localStorageService: LocalStorageService) {}

	//#region Local Storage Process
	isToastLS(): boolean {
		let localToast = this.localStorageService.get(this.toastListKeyFromLocalStorage);
		return !!localToast;
	}

	getToastLS(): string {
		return this.localStorageService.get(this.toastListKeyFromLocalStorage) || '';
	}

	setToastLS(pValue: string): void {
		this.localStorageService.set({ key: this.toastListKeyFromLocalStorage, value: pValue });
	}

	removeToastLS(): void {
		if (this.isToastLS()) this.localStorageService.remove(this.toastListKeyFromLocalStorage);
	}
	//#endregion

	//#region Toast Process
	getToast(): Observable<IToastModel> {
		return this.toast;
	}

	getLSToast(): Observable<IToastModel> {
		let currentToast = this.toastSubject.getValue();
		let localToast = this.localStorageService.get(this.toastListKeyFromLocalStorage);
		if (localToast) {
			currentToast = JSON.parse(this.localStorageService.get(this.toastListKeyFromLocalStorage) || '');
		}
		this.toastSubject.next(currentToast);
		return this.toast;
	}

	setToast(toast: IToastModel): void {
		this.toastSubject.next(toast);
		this.setToastLS(JSON.stringify(toast));
	}

	clearToast() {
		let emptyToastModel: IToastModel = {} as IToastModel;
		this.toastSubject.next(emptyToastModel);
		this.toastSubject.complete();
		this.removeToastLS();
		this.messageService.clear();
	}

	setKeyFromPosition(position?: TToastPosition) {
		let key = '';
		switch (position) {
			case 'top-left':
				key = 'tl';
				break;

			case 'top-center':
				key = 'tc';
				break;

			case 'top-right':
				key = 'tr';
				break;

			case 'center-left':
			case 'center':
			case 'center-right':
				key = 'c';
				break;

			case 'bottom-left':
				key = 'bl';
				break;

			case 'bottom-center':
				key = 'bc';
				break;

			case 'bottom-right':
				key = 'br';
				break;

			default:
				key = 'default';
				break;
		}

		return key;
	}

	// Burası tekrar düşünülsün. Örneğin her farklı tipteki toast için farklı default ayarları olsun.
	setOptions(pToast: IToastModel): IToastModel {
		let options = {} as IToastModel;

		// Object.keys(pToast).forEach((key: keyof IToastModel) => {
		// 	options[key] = pToast[key];
		// });

		options = { ...pToast, key: this.setKeyFromPosition(pToast.position) };

		return options as IToastModel;
	}

	show(pToast: IToastModel) {
		let opt = this.setOptions(pToast);
		this.messageService.add(opt);
	}

	showMultiple(pMessages: IToastModel[]) {
		this.messageService.addAll(pMessages);
	}

	info(pToast: IToastModel) {
		let opt = this.setOptions({ ...pToast, severity: 'info' } as IToastModel);
		this.messageService.add(opt);
	}

	error(pToast: IToastModel) {
		let opt = this.setOptions({ ...pToast, severity: 'error' } as IToastModel);
		this.messageService.add(opt);
	}

	success(pToast: IToastModel) {
		let opt = this.setOptions({ ...pToast, severity: 'success' } as IToastModel);
		this.messageService.add(opt);
	}

	warning(pToast: IToastModel) {
		let opt = this.setOptions({ ...pToast, severity: 'warn' } as IToastModel);
		this.messageService.add(opt);
	}
	//#endregion
}