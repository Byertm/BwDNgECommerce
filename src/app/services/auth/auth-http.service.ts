import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { UserInput } from '@models/user.model';
import { Observable } from 'rxjs';

const API_URL: string = `${environment.baseUrl + environment.apiVersion}`;
const API_AUTH_URL: string = `${API_URL}auth`;

@Injectable({ providedIn: 'root' })
export class AuthHTTPService {
	constructor(private http: HttpClient) {}

	socialLogin(): Observable<any> {
		const endPointUrl: string = `${API_AUTH_URL}/socialLogin/`;
		return this.http.post<any>(endPointUrl, {}, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
	}

	login(userInput: UserInput): Observable<any> {
		const endPointUrl: string = `${API_AUTH_URL}/login/`;

		return this.http.post<any>(endPointUrl, userInput, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
	}
}