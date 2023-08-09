import { Component } from '@angular/core';
import { PrimeToastService } from '@services/plugins';

@Component({
	selector: 'eb-auth-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class AuthFooterComponent {
	constructor(private primeToastService: PrimeToastService) {}

	socialLink(pSummary: string = 'Sosyal Medya') {
		this.primeToastService.warning({ position: 'bottom-left', summary: pSummary, detail: 'Hazırlanıyor...' });
	}
}