import { Injectable } from '@angular/core';
import { type IUser, User } from '@models/user.model';
import { BaseService } from '@services/common/base.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
	private userSubject = new BehaviorSubject<IUser>(new User());
	private user = this.userSubject.asObservable();

	private usersSubject = new BehaviorSubject<Array<IUser>>([] as IUser[]);
	private users = this.usersSubject.asObservable();

	// private userKeyFromLS: LocalStorageUnionKeys = 'user';

	getUser(userId: number | string): Observable<IUser> {
		if (this.userSubject.getValue()?.id <= 0 || this.userSubject.getValue()?.id !== userId)
			this.getData(`users/${userId}`, {}).subscribe((product) => {
				this.userSubject.next(product);
			});

		return this.user;
	}

	getAllUsers(pLimit: number = 20, pSort: 'asc' | 'desc' = 'desc'): Observable<Array<IUser>> {
		if (this.usersSubject.getValue().length <= 0)
			this.getData(`users?limit=${pLimit}&sort=${pSort}`, {}).subscribe((users) => {
				this.usersSubject.next(users);
			});

		return this.users;
	}

	getUsersWithSort(pSort: 'asc' | 'desc' = 'desc'): Observable<Array<IUser>> {
		if (this.usersSubject.getValue().length <= 0)
			this.getData(`users?sort=${pSort}`, {}).subscribe((users) => {
				this.usersSubject.next(users);
			});

		return this.users;
	}

	addUser(pUser: IUser) {
		const postModel = JSON.stringify({
			email: pUser.email,
			username: pUser.username,
			password: pUser.password,
			description: pUser.description,
			name: pUser.name,
			address: pUser.address,
			phone: pUser.phone
		});

		this.postData(`users`, postModel).subscribe((newUser: IUser) => {
			this.usersSubject.next([...this.usersSubject.getValue(), newUser] as IUser[]);
		});
	}

	updateUser(pUser: IUser, pUpdateType: 'put' | 'patch' = 'patch') {
		if (pUpdateType === 'patch') {
			const patchModel = JSON.stringify({
				email: pUser.email,
				username: pUser.username,
				password: pUser.password,
				description: pUser.description,
				name: pUser.name,
				address: pUser.address,
				phone: pUser.phone
			});

			this.patchData(`users/${pUser.id}`, patchModel).subscribe((updatedUser: IUser) => {
				this.usersSubject.next([...this.usersSubject.getValue().filter((user) => user.id !== pUser.id), updatedUser] as IUser[]);
			});
		} else {
			const putModel = JSON.stringify({
				email: pUser.email,
				username: pUser.username,
				password: pUser.password,
				description: pUser.description,
				name: pUser.name,
				address: pUser.address,
				phone: pUser.phone
			});

			this.putData(`users/${pUser.id}`, putModel).subscribe((updatedUser: IUser) => {
				this.usersSubject.next([...this.usersSubject.getValue().filter((user) => user.id !== pUser.id), updatedUser] as IUser[]);
			});
		}
	}

	deleteUser(pUserId: number | string) {
		this.deleteData(`users/${pUserId}`, {}).subscribe((result: boolean) => {
			if (result) this.usersSubject.next([...this.usersSubject.getValue().filter((user) => user.id !== pUserId)] as IUser[]);
		});
	}
}