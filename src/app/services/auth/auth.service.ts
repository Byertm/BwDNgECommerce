import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IUser, UserInput, UserOutput } from '@models/user.model';
import { UserService } from '@services/user/user.service';
import { LocalStorageService } from '@services/plugins/index';
import { AuthHTTPService } from '@services/auth/auth-http.service';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, finalize, tap } from 'rxjs/operators';
import { LocalStorageUnionKeys } from '@services/plugins/localStorage.service';

@Injectable({ providedIn: 'root' })
export class AuthService implements OnDestroy {
	//#region Private Fields
	private authSubject = new BehaviorSubject<any>({});
	private authObject = this.authSubject.asObservable();
	private isLoggedSubject = new BehaviorSubject<boolean>(false);
	public isLogged = this.isLoggedSubject.asObservable();
	private allUsersSubject = new BehaviorSubject<Array<UserOutput>>([]);
	public allUsers = this.allUsersSubject.asObservable();
	private authDataKeyFromLocalStorage: LocalStorageUnionKeys = 'authData';
	private tokenKeyFromLocalStorage: LocalStorageUnionKeys = 'token';
	private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
	//#endregion

	//#region Public Fields
	currentUser$: Observable<any>;
	isLoading$: Observable<boolean>;
	currentUserSubject: BehaviorSubject<any>;
	isLoadingSubject: BehaviorSubject<boolean>;
	allUsers$: Observable<Array<UserOutput>>;
	//#endregion

	get currentUserValue(): any {
		return this.currentUserSubject.value;
	}

	set currentUserValue(user: any) {
		this.currentUserSubject.next(user);
	}

	constructor(private router: Router, private userService: UserService, private authHttpService: AuthHTTPService, private localStorageService: LocalStorageService) {
		this.isLoadingSubject = new BehaviorSubject<boolean>(false);
		this.currentUserSubject = new BehaviorSubject<any>(undefined);
		this.currentUser$ = this.currentUserSubject.asObservable();
		this.isLoading$ = this.isLoadingSubject.asObservable();
		this.allUsers$ = this.allUsersSubject.asObservable();

		this.getAllUsers().subscribe((users: IUser[]) => {
			const allUserData: UserOutput[] = users.map((user: IUser) => {
				let newData = {
					email: user.email,
					username: user.username,
					// password: user.password,
					description: user.description,
					name: user.name,
					address: user.address,
					phone: user.phone,
					// __v: user.__v,
					id: user.id,
					createAt: user.createAt,
					updateAt: user.updateAt
				} as UserOutput;
				return newData;
			});
			this.allUsersSubject.next(allUserData);
		});
	}

	//#region  Private Methods
	isTokenValid() {
		const token = JSON.parse(this.localStorageService.get(this.tokenKeyFromLocalStorage) || 'null');

		if (!token) return false;

		return true;
	}

	buildAuth(auth: any) {
		this.authSubject.next(auth);
	}

	getAuth(): Observable<any> {
		return this.authObject;
	}

	getAuthFromLocalStorage(): any {
		try {
			const token = JSON.parse(this.localStorageService.get(this.tokenKeyFromLocalStorage) || 'null');
			const authData = JSON.parse(this.localStorageService.get(this.authDataKeyFromLocalStorage) || '{}');
			this.buildAuth(authData);
			return authData;
		} catch (error) {
			console.error(error);
			return undefined;
		}
	}

	setAuthFromLocalStorage(authData?: UserOutput, pToken?: string): boolean {
		if (authData && pToken) {
			this.localStorageService.set({ key: 'authData', value: JSON.stringify(authData) });
			this.localStorageService.set({ key: 'token', value: JSON.stringify(pToken) });
			this.setLogged(true);
			return true;
		}
		return false;
	}
	//#endregion

	// #region Public Methods
	getSingleUser(userInput: UserInput): UserOutput | undefined {
		return this.allUsersSubject.getValue().find((user: UserOutput) => user.username === userInput.username);
	}

	getAllUsers(): Observable<IUser[]> {
		return this.userService.getAllUsers();
	}

	login(userInput: UserInput): Observable<boolean> {
		this.isLoadingSubject.next(true);

		return this.authHttpService.login(userInput).pipe(
			map((resToken: string) => {
				const authData = this.getSingleUser(userInput);
				const result = this.setAuthFromLocalStorage(authData, resToken);
				this.isLoggedSubject.next(result);
				return result;
			}),
			// catchError((err) => {
			// 	console.log(JSON.stringify(err));
			// }),
			finalize(() => this.isLoadingSubject.next(false))
		);
	}

	isLogging(): Observable<boolean> {
		return this.isLogged;
	}

	getLogged(): boolean {
		return this.isLoggedSubject.getValue();
	}

	setLogged(pStatus: boolean) {
		this.isLoggedSubject.next(pStatus);
	}

	logout() {
		this.localStorageService.remove(this.tokenKeyFromLocalStorage);
		this.localStorageService.remove(this.authDataKeyFromLocalStorage);
		this.isLoggedSubject.next(false);
		this.isLoadingSubject.next(false);
		this.buildAuth({});
		this.router.navigate(['/account/login'], { queryParams: {} });
	}
	//#endregion

	ngOnDestroy() {
		this.unsubscribe.forEach((sb) => sb.unsubscribe());
	}
}