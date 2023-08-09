import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { AuthService } from '@services/auth/auth.service';
import { PrimeToastService } from '@services/plugins';
import { delay, tap } from 'rxjs/operators';
import { of } from 'rxjs';
// import { first } from 'rxjs/operators';

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

	//, private authenticationService: AuthService
	constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private primeToastService: PrimeToastService) {
		// if (this.authenticationService.currentUserValue) this.router.navigate(['/']);

		this.loginForm = this.formBuilder.group({ username: ['', Validators.required], password: ['', Validators.required] });
	}

	get f() {
		return this.loginForm.controls;
	}

	// setLoginForm(): FormGroup<{ username: FormControl<string | null>; password: FormControl<string | null> }> {
	// 	return this.formBuilder.group({ username: ['', Validators.required], password: ['', Validators.required] });
	// }

	socialLogin() {
		this.primeToastService.info({ summary: 'Bu kısım daha yazılmadı!', position: 'top-left' });
	}

	onSubmit() {
		this.submitted = true;

		// stop here if form is invalid
		alert('girdi');

		if (this.loginForm.invalid) return;

		alert('devam');

		this.loading = true;

		// this.authenticationService
		// 	.login(this.f.username.value, this.f.password.value)
		// 	.pipe(first())
		// 	.subscribe(
		// 		(data: any) => this.router.navigate([this.returnUrl]),
		// 		(error: any) => {
		// 			this.error = error;
		// 			this.loading = false;
		// 		}
		// 	);

		const observablePattern = of(true)
			.pipe(
				delay(2000),
				tap(() => {
					this.loading = false;
					this.submitted = false;
					this.primeToastService.info({ summary: 'Giriş yapma işlemi simule edildi. Yönlendiriliyorsunuz!', position: 'top-left' });
				})
			)
			.subscribe(() => {
				this.router.navigateByUrl('/');
			});
	}

	ngOnInit() {
		this.loginForm = this.formBuilder.group({ username: ['', Validators.required], password: ['', Validators.required] });

		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}
}