import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { ToastService, IToastPositionModel } from '@services/plugins/iziToast.service';
// import { ErrorMessageHelper } from '@helpers/errorMessageHelper';
import { environment } from '@src/environments/environment';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BaseService {
	baseUrl: string = environment.baseUrl;
	apiVerison: string = environment.apiVersion;
	apiUrl: string = `${this.baseUrl}${this.apiVerison}`;

	public _networkConnectionError$ = new BehaviorSubject<boolean>(false);

	// , public toast: ToastService
	constructor(public http: HttpClient) {}

	public getDefaultPostOptions = () => {
		return {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
				'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
			})
		};
	};

	getData(category: string, data: any) {
		let params = new HttpParams();
		let datePipe = new DatePipe('en-US');
		this._networkConnectionError$.next(false);

		for (let property in data) {
			if (data.hasOwnProperty(property)) {
				if (data[property] instanceof Date) {
					let format = 'yyyy-MM-dd';
					if (property === 'now') {
						format += ' HH:00';
					}
					data[property] = datePipe.transform(data[property], format);
				}
				params = params.append(property, data[property]);
			}
		}

		return this.http.get<any>(this.apiUrl + category, { params: params }).pipe(
			catchError((err) => {
				if (err.status === 0) {
					this._networkConnectionError$.next(true);
				} else {
					// this.toast.error({ title: ErrorMessageHelper.getMessage(err), position: IToastPositionModel.BottomCenter });
					console.error('GET ITEM', err);
				}
				return of(err);
			})
		);
	}

	postData(category: string, data: any) {
		this._networkConnectionError$.next(false);

		if (typeof data === 'object') {
			let timeOffset = -1 * (new Date().getTimezoneOffset() / 60);
			Object.assign(data, { ...data, timeOffset: timeOffset });
		}

		// let timeOffset = -1 * (new Date().getTimezoneOffset() / 60);

		// if (typeof data == 'object')
		// 	Object.defineProperty(data, 'TimeOffset', { value: timeOffset });

		return this.http.post<any>(this.apiUrl + category, data, this.getDefaultPostOptions()).pipe(
			catchError((err) => {
				if (err.status === 0) {
					this._networkConnectionError$.next(true);
				} else {
					// this.toast.error({ title: ErrorMessageHelper.getMessage(err) });
					console.error('POST ITEM', err);
				}
				return of(err);
			})
		);
	}

	deleteData(category: string, data: any) {
		this._networkConnectionError$.next(false);

		let params = new HttpParams();
		let datePipe = new DatePipe('en-US');
		for (let property in data) {
			if (data.hasOwnProperty(property)) {
				if (data[property] instanceof Date) {
					let format = 'yyyy-MM-dd';
					if (property === 'now') {
						format += ' HH:00';
					}
					data[property] = datePipe.transform(data[property], format);
				}
				params = params.append(property, data[property]);
			}
		}

		return this.http.delete<any>(this.apiUrl + category, { params: params }).pipe(
			catchError((err) => {
				if (err.status === 0) {
					this._networkConnectionError$.next(true);
				} else {
					// this.toast.error({ title: ErrorMessageHelper.getMessage(err) });
					console.error('DELETE ITEM', err);
				}
				return of(err);
			})
		);
	}

	patchData(category: string, data: any) {
		let params = new HttpParams();
		let datePipe = new DatePipe('en-US');
		for (let property in data) {
			if (data.hasOwnProperty(property)) {
				if (data[property] instanceof Date) {
					let format = 'yyyy-MM-dd';
					if (property === 'now') {
						format += ' HH:00';
					}
					data[property] = datePipe.transform(data[property], format);
				}
				params = params.append(property, data[property]);
			}
		}

		return this.http.patch<any>(this.apiUrl + category, { params: params }).pipe(
			catchError((err) => {
				if (err.status === 0) {
					this._networkConnectionError$.next(true);
				} else {
					// this.toast.error({ title: ErrorMessageHelper.getMessage(err), position: IToastPositionModel.BottomCenter });
					console.error('PATCH ITEM', err);
				}
				return of(err);
			})
		);
	}
}