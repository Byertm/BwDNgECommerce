import { Component } from '@angular/core';

@Component({
	selector: 'eb-auth-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class AuthHeaderComponent {
	isLogged: boolean = false;
}