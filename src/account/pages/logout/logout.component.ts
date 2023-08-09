import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeToastService } from '@services/plugins';
import { delay, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
	selector: 'eb-auth-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
	constructor(private router: Router, private primeToastService: PrimeToastService) {}

	logout() {
		const observablePattern = of(true)
			.pipe(
				delay(1000),
				tap(() => {
					console.log('Çıkış yapılıyor.');
					this.primeToastService.success({ summary: 'Çıkış yapma işlemi başarıyla simule edildi. Yönlendiriliyorsunuz!', position: 'bottom-left' });
				})
			)
			.subscribe(() => {
				this.router.navigateByUrl('/');
			});
	}

	ngOnInit() {
		this.logout();
	}
}