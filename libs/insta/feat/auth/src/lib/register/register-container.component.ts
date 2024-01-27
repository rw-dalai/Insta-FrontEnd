import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterFormData } from '../model/register-view.model';

import { AuthService } from '../../../../../data/auth/src';
// import { UserHttpService } from '@insta/data/user';

// Smart Container which connects to a Service or Store.
// -> See also register.component.ts
@Component({
	selector: 'insta-register-container',
	standalone: true,
	imports: [CommonModule, RegisterComponent],
	template: `<insta-register (register)="onRegister($event)"></insta-register>`,
	styles: [],
})
export class RegisterContainerComponent {
	// userService = inject(UserHttpService);
	authService = inject(AuthService);

	onRegister(formData: RegisterFormData) {
		const { passwordConfirm, ...command } = formData;

		// const registrationCommand = command as UserRegistrationCommand;

		this.authService.register(command);
	}
}
