import { Component, Input } from '@angular/core';

@Component({
	selector: 'eb-app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent {
	@Input() projectName?: string = 'Burası Baba Sayfa';
}