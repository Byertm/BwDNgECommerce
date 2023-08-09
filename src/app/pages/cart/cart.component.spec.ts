import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from '@pages/index';

describe('CartComponent', () => {
	let component: CartComponent;
	let fixture: ComponentFixture<CartComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [CartComponent]
		});
		fixture = TestBed.createComponent(CartComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});