import { Component } from '@angular/core';
import { PrimeToastService } from '@services/plugins';

@Component({
	selector: 'eb-app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
	constructor(private primeToastService: PrimeToastService) {}

	socialLink(pSummary: string = 'Sosyal Medya') {
		this.primeToastService.warning({ position: 'bottom-right', summary: pSummary, detail: 'Hazırlanıyor...' });
	}
}