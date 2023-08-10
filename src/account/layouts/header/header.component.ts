import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '@services/index';

@Component({
	selector: 'eb-auth-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class AuthHeaderComponent implements OnInit {
	cartProductCount: number = 0;
	wishProductCount: number = 0;
	isLogged: boolean = true;
	sticky: boolean = false;

	constructor(private authService: AuthService) {}

	@HostListener('window:scroll', ['$event'])
	handleScroll() {
		const windowScroll = window.pageYOffset;
		if (windowScroll >= 300) this.sticky = true;
		else this.sticky = false;
	}

	loadControls(): void {
		this.authService.isLogging().subscribe((isLogged) => {
			this.isLogged = isLogged;
		});
	}

	ngOnInit(): void {
		this.loadControls();
	}
}