import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { LocalStorageService } from '@services/plugins';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	constructor(private localStorageService: LocalStorageService) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const token = this.localStorageService.get('token');
		const isAPIUrl = request.url.startsWith(environment.baseUrl);

		if (token && isAPIUrl) request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });

		return next.handle(request);
	}
}