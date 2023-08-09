import { Component } from '@angular/core';

@Component({
	selector: 'eb-toast-wrapper',
	template: `<div class="wrapper">
		<p-toast key="default"></p-toast>
		<p-toast key="tl" position="top-left"></p-toast>
		<p-toast key="tc" position="top-center"></p-toast>
		<p-toast key="tr" position="top-right"></p-toast>
		<p-toast key="c" position="center"></p-toast>
		<p-toast key="bl" position="bottom-left"></p-toast>
		<p-toast key="bc" position="bottom-center"></p-toast>
		<p-toast key="br" position="bottom-right"></p-toast>
	</div>`
})
export class ToastWrapperComponent {}