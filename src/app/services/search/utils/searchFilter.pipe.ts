import { Pipe, PipeTransform } from '@angular/core';
import { type IProduct } from '@models/index';

@Pipe({ name: 'productFilter' })
export class ProductFilterPipe<T> implements PipeTransform {
	searchFilter(items: IProduct[], searchValue: string): IProduct[] {
		return items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));
	}

	categoryFilter(items: IProduct[], categoryModel: string): IProduct[] {
		return items.filter((item) => categoryModel === '' || item.category.toLowerCase() === categoryModel.toLowerCase());
	}

	transform(items: IProduct[], value: string, searchValue: string, categoryValue: string): IProduct[] {
		// return empty array if array is falsy
		if (!items) return [];

		// return the original array if value = Default
		if (value === 'Default')
			// return items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));
			return this.searchFilter(this.categoryFilter(items, categoryValue), searchValue);

		// return the sorted array from Low to High
		if (value === 'Low to High')
			return this.searchFilter(this.categoryFilter(items, categoryValue), searchValue).sort((a, b) => {
				return a.price - b.price;
			});

		// return the sorted array from High to Low
		if (value === 'High to Low')
			return this.searchFilter(this.categoryFilter(items, categoryValue), searchValue).sort((a, b) => {
				return b.price - a.price;
			});

		// return the sorted array from High to Low
		if (value === 'A to Z') {
			return this.searchFilter(this.categoryFilter(items, categoryValue), searchValue).sort((a, b) => {
				let aTitle = a.title.toLowerCase();
				let bTitle = b.title.toLowerCase();

				if (aTitle < bTitle) return -1;
				if (aTitle > bTitle) return 1;
				return 0;
			});
		}

		// retrun the filtered array
		return this.searchFilter(this.categoryFilter(items, categoryValue), searchValue).sort((a, b) => {
			let aTitle = a.title.toLowerCase();
			let bTitle = b.title.toLowerCase();

			if (aTitle > bTitle) return -1;
			if (aTitle < bTitle) return 1;
			return 0;
		});
	}
}