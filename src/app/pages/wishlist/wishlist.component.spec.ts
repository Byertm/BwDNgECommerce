import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistComponent } from '@pages/index';

describe('WishlistComponent', () => {
	let component: WishlistComponent;
	let fixture: ComponentFixture<WishlistComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [WishlistComponent]
		});
		fixture = TestBed.createComponent(WishlistComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});