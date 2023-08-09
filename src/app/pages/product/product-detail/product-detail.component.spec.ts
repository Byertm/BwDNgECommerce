import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailComponent } from '@pages/index';

describe('ProductDetailComponent', () => {
	let component: ProductDetailComponent;
	let fixture: ComponentFixture<ProductDetailComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ProductDetailComponent]
		});
		fixture = TestBed.createComponent(ProductDetailComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});