import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicAuthService } from '@insta/data/auth';
import { UserLoginCommand } from '@insta/data/user';
import { LoginComponent } from './login.component';
import { LoginFormData } from '../model/login-view.model';
import { Router } from '@angular/router';

// Smart Container which connects to a Service or Store.
// -> See also login.component.ts
@Component({
	selector: 'insta-login-container',
	standalone: true,
	imports: [CommonModule, LoginComponent],
	template: ` <insta-register (login)="onLogin($event)"></insta-register>`,
	styles: [],
})
export class LoginContainerComponent {
	authService = inject(BasicAuthService);
	router = inject(Router);

	onLogin(formData: LoginFormData) {
		const command: UserLoginCommand = formData;

		this.authService
			.login(command)
			// success
			.then(() => {
				this.router.navigate(['/']);
			})
			// failure
			.catch((error) => {
				// TODO Show Angular Material Snackbar
				console.error('Login failed:', error);
			});
	}
}
