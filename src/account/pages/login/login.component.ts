import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeToastService } from '@services/plugins';
import { AuthService } from '@services/index';
import { first } from 'rxjs/operators';

type LFType = FormGroup<{ username: FormControl<string | null>; password: FormControl<string | null> }>;

@Component({
	selector: 'eb-auth-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginForm: LFType = new FormGroup({
		username: new FormControl('', { validators: Validators.required }),
		password: new FormControl('', { validators: Validators.required })
	});

	loading: boolean = false;
	submitted: boolean = false;
	returnUrl: string = '';
	error = '';

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private authenticationService: AuthService,
		private primeToastService: PrimeToastService
	) {
		const isLogged: boolean = this.authenticationService.isTokenValid(); // this.authenticationService.isLogging();
		if (isLogged) this.router.navigate(['/']);

		this.loginForm = this.setLoginForm();
	}

	get f() {
		return this.loginForm.controls;
	}

	setLoginForm(): FormGroup<{ username: FormControl<string | null>; password: FormControl<string | null> }> {
		return this.formBuilder.group({ username: ['', Validators.required], password: ['', Validators.required] });
	}

	socialLogin() {
		this.primeToastService.info({ summary: 'Bu kısım daha yazılmadı!', position: 'top-left' });
	}

	onSubmit() {
		this.submitted = true;

		if (this.loginForm.invalid) return;

		this.loading = true;

		this.authenticationService
			.login({ username: this.f.username.value as string, password: this.f.password.value as string })
			.pipe(first())
			.subscribe(
				(data: any) => this.router.navigate([this.returnUrl]),
				(error: any) => {
					this.error = error;
					this.loading = false;
				}
			);
	}

	ngOnInit() {
		this.loginForm = this.setLoginForm();

		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}
}