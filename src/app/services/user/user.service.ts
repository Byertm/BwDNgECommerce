import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { BaseService } from '@services/common/base.service';

import { LocalStorageUnionKeys } from '@services/plugins/localStorage.service';
// import { LocalStorageService } from '@services/plugins';
import { type IUser, User } from '@models/user.model';

// import { ConfirmationService } from 'primeng/api';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
	private userSubject = new BehaviorSubject<IUser>(new User());
	private user = this.userSubject.asObservable();

	private usersSubject = new BehaviorSubject<Array<IUser>>([] as IUser[]);
	private users = this.usersSubject.asObservable();

	private allUserCategoriesSubject = new BehaviorSubject<Array<string>>([] as string[]);
	private allUserCategories = this.allUserCategoriesSubject.asObservable();

	private userKeyFromLocalStorage: LocalStorageUnionKeys = 'authData';

	constructor(public override http: HttpClient) {
		super(http);
	}
	// constructor(public http: HttpClient, public toast: ToastService, private auth: AuthService) { super(http, toast); }
	// private confirmationService: ConfirmationService, private localStorageService: LocalStorageService

	getUser(userId: number | string): Observable<IUser> {
		// return this.user;
		return this.getData(`users/${userId}`, {});
	}

	getAllUsers(): Observable<Array<IUser>> {
		// return this.users;
		// return this.http.get<Array<IUser>>('users');
		return this.getData('users', {});
	}

	getUsersWithSort(): Observable<Array<IUser>> {
		// return this.users;
		return this.getData('users', {});
	}

	getUsersWithCategory(pCategoryId: number | string): Observable<Array<IUser>> {
		// return this.users;
		return this.getData(`users/category/${pCategoryId}`, {});
	}

	getAllUserCategories(): Observable<Array<string>> {
		// return this.allUserCategories;
		return this.getData(`users/categories`, {});
	}

	addUser() {
		fetch('https://fakestoreapi.com/users', {
			method: 'POST',
			body: JSON.stringify({
				title: 'test user',
				price: 13.5,
				description: 'lorem ipsum set',
				image: 'https://i.pravatar.cc',
				category: 'electronic'
			})
		})
			.then((res) => res.json())
			.then((json) => console.log(json));
	}

	updateUser() {
		fetch('https://fakestoreapi.com/users/7', {
			method: 'PUT',
			body: JSON.stringify({
				title: 'test user',
				price: 13.5,
				description: 'lorem ipsum set',
				image: 'https://i.pravatar.cc',
				category: 'electronic'
			})
		})
			.then((res) => res.json())
			.then((json) => console.log(json));
		fetch('https://fakestoreapi.com/users/7', {
			method: 'PATCH',
			body: JSON.stringify({
				title: 'test user',
				price: 13.5,
				description: 'lorem ipsum set',
				image: 'https://i.pravatar.cc',
				category: 'electronic'
			})
		})
			.then((res) => res.json())
			.then((json) => console.log(json));
	}

	deleteUser() {
		fetch('https://fakestoreapi.com/users/6', {
			method: 'DELETE'
		})
			.then((res) => res.json())
			.then((json) => console.log(json));
	}
}