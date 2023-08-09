import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
	selector: 'eb-error-page',
	templateUrl: './error-page.component.html',
	styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit, OnDestroy {
	private sub?: Subscription;
	type: string | null = null;
	title: string | null = null;
	desc: string | null = null;

	constructor(private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.type = this.route.snapshot.paramMap.get('type');

		debugger;
		console.log(this.type);

		this.sub = this.route.data.subscribe((param: Data) => {
			if (param['type']) this.type = param['type'];
			if (param['title']) this.title = param['title'];
			if (param['desc']) this.desc = param['desc'];
		});

		switch (this.type) {
			case '404':
				if (!this.title) this.title = 'Page Not Found';
				if (!this.desc) this.desc = "Oopps!! The page you were looking for doesn't exist.";
				break;

			case '500':
				if (!this.title) this.title = 'Internal server error';
				if (!this.desc) this.desc = 'Oopps!! There wan an error. Please try agin later.';
				break;

			default:
				// if (!this.type)
				this.type = 'Ooops..';
				if (!this.title) this.title = 'Something went wrong';
				if (!this.desc) this.desc = 'Looks like something went wrong.<br>' + "We're working on it";
				break;
		}
	}

	ngOnDestroy(): void {
		this.sub?.unsubscribe();
	}
}