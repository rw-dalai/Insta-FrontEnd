import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterFormData } from '../model/register-view.model';
import { BasicAuthService } from '@insta/data/auth';
import { Router } from '@angular/router';

// Smart Container which connects to a Service or Store.
// -> See also login.component.ts
@Component({
	selector: 'insta-register-container',
	standalone: true,
	imports: [CommonModule, RegisterComponent],
	template: `<insta-register (register)="onRegister($event)"></insta-register>`,
	styles: [],
})
export class RegisterContainerComponent {
	authService = inject(BasicAuthService);
	router = inject(Router);

	onRegister(formData: RegisterFormData) {
		const { passwordConfirm, ...command } = formData;

		// const registrationCommand = command as UserRegistrationCommand;

		this.authService
			.register(command)
			// success
			.then(() => {
				this.router.navigate(['/auth/login']);
			})
			// failure
			.catch((error) => {
				// TODO Show Angular Material Snackbar
				console.error('Register failed:', error);
			});
	}
}
