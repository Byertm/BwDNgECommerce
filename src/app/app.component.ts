import { Component, OnInit } from '@angular/core';
import { PrimeToastService } from '@services/plugins';

@Component({
	selector: 'eb-app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'eb-ng-e-commerce';

	constructor(private primeToastService: PrimeToastService) {}

	welcomeMessage() {
		Promise.resolve(1).then(() => {
			this.primeToastService.info({ summary: 'Hoşgeldiniz!', detail: 'Angular 16 - E-Commerce Challenge', position: 'top-center' });
		});
	}

	ngOnInit() {
		this.welcomeMessage();
	}
}