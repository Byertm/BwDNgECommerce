import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/index';
import { PrimeToastService } from '@services/plugins';

@Component({
	selector: 'eb-auth-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
	constructor(private router: Router, private authenticationService: AuthService, private primeToastService: PrimeToastService) {}

	logout() {
		if (this.authenticationService.isLogged) {
			this.authenticationService.logout();
			this.router.navigateByUrl('/auth');
			this.primeToastService.success({ summary: 'Çıkış yapma işlemi başarıyla simule edildi. Yönlendiriliyorsunuz!', position: 'bottom-left' });
		} else this.router.navigateByUrl('/auth');
	}

	ngOnInit() {
		this.logout();
	}
}