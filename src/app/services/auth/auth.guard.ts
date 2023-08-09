import { Injectable } from '@angular/core';
import { AuthService } from '@services/index';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
	// Version - 1
	constructor(private authService: AuthService, private router: Router) {}

	canActivate() {
		// _route: ActivatedRouteSnapshot, _state: RouterStateSnapshot
		const isTokenValid = this.authService.isTokenValid();
		if (!isTokenValid) {
			this.authService.logout();

			this.router.navigate(['/auth']);
		}

		return isTokenValid;
	}

	// Version - 2
	// constructor(private router: Router, private localStorageToken: LocalStorageService) {}

	// private _tokenExpired(expiration: number): boolean {
	// 	return Math.floor(new Date().getTime() / 1000) >= expiration;
	// }

	// canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
	// 	// _route: ActivatedRouteSnapshot, _state: RouterStateSnapshot
	// 	const token = this.localStorageToken.get('token');

	// 	if (token) {
	// 		const tokenDecode = JSON.parse(atob(token.split('.')[1]));
	// 		if (!this._tokenExpired(tokenDecode.iat)) return true;
	// 	}

	// 	this.router.navigate(['/auth']);

	// 	return false;
	// }

	// Version - 3
	// constructor(private authService: AuthService, private router: Router) {}

	// canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
	// 	if (!this.authService.getLogged()) {
	// 		this.router.navigate(['/auth']);
	// 		return false;
	// 	}

	// 	// logged in, so return true
	// 	return this.authService.getLogged();
	// }
}