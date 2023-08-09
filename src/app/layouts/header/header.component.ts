import { Component } from '@angular/core';

@Component({
	selector: 'eb-app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
	isLogged: boolean = true;
}