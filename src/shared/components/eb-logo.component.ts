import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
	selector: 'eb-logo',
	template: `<a class="text-white mb-3 mb-md-0 logo">
		<img *ngIf="!isLetterLogo" alt="BwD Logo" src="assets/images/bwd-logo.svg" class="logo-image" />
		<img *ngIf="isLetterLogo" alt="E Letter Logo" src="assets/images/e-letter.svg" class="logo-image" />

		<span class="logo-text">
			<span class="logo-text">Angular 16 E-Commerce Challenge</span>
			<span class="logo-sub-text">Ersin Biltekin</span>
			<!-- <span class="logo-slogan">Byertm Web Design</span> -->
		</span>
	</a>`,
	styles: [
		`
			:host {
				display: block;

				.logo {
					$wh: 3rem;
					display: inline-flex;
					justify-content: center;
					align-items: center;
					gap: 1rem;
					text-decoration: none;

					&-image {
						max-width: $wh;
						max-height: $wh;
						object-fit: cover;
					}

					&-text {
						position: relative;
						display: inline-flex;
						flex-direction: column;
						width: 16rem;
						min-height: $wh;
						height: 100%;
						gap: 0.5rem;
						color: #ffffff;
						overflow: hidden;

						.logo {
							&-text,
							&-sub-text {
								position: absolute;
								left: 0;
								transition: all 300ms ease-in-out;
							}

							&-text {
								top: 50%;
								translate: 0 -25%;
							}

							&-sub-text {
								bottom: -100%;
								opacity: 0;
								visibility: hidden;
							}
						}
					}

					&:hover {
						.logo-text {
							.logo-text {
								top: 0;
								translate: 0 0;
							}

							.logo-sub-text {
								bottom: 0;
								opacity: 1;
								visibility: visible;
							}
						}
					}
				}
			}
		`
	],
	standalone: true,
	imports: [NgIf]
})
export class EBLogoComponent {
	@Input() isLetterLogo: boolean = false;
}