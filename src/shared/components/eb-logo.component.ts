import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
	selector: 'eb-logo',
	template: `<a class="text-white mb-3 mb-md-0 logo">
		<img *ngIf="!isLetterLogo" alt="BwD Logo" src="assets/images/bwd-logo.svg" class="logo-image" />
		<img *ngIf="isLetterLogo" alt="E Letter Logo" src="assets/images/e-letter.svg" class="logo-image" />

		<span class="logo-text-wrapper">
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
					flex-direction: column;
					justify-content: center;
					align-items: center;
					gap: 1rem;
					margin-bottom: 1rem;
					text-decoration: none;

					@media only screen and (min-width: 768px) {
						flex-direction: row;
						gap: 1rem;
						margin-bottom: 0;
					}

					&-image {
						max-width: $wh;
						max-height: $wh;
						object-fit: cover;
					}

					&-text-wrapper {
						position: relative;
						display: inline-flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						width: 16rem;
						min-height: $wh;
						height: 100%;
						gap: 0.5rem;
						color: #ffffff;
						overflow: hidden;

						.logo {
							&-text,
							&-sub-text {
								width: inherit;
								position: absolute;
								left: 0;
								transition: all 300ms ease-in-out;
							}

							&-text {
								top: 50%;
								translate: 0 -50%;
							}

							&-sub-text {
								bottom: -100%;
								opacity: 0;
								visibility: hidden;
							}
						}
					}

					&:focus,
					&:hover,
					&:focus-within {
						.logo-text-wrapper {
							.logo-text {
								top: 0;
								translate: 0 0;
							}

							.logo-sub-text {
								bottom: 0;
								opacity: 1;
								visibility: visible;
							}

							@media only screen and (max-width: 767px) {
								.logo-text,
								.logo-sub-text {
									left: 50%;
									translate: -50% 0;
								}
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