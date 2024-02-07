import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CustomValidators } from '@insta/util';
import { PasswordStrengthBarComponent } from '@insta/ui/strengthbar';
import { RegisterFormData, RegisterFormErrorType } from '../model/register-view.model';
import { LoginFormData, LoginFormErrorType, LoginFormType } from '../model/login-view.model';

@Component({
	selector: 'insta-register',
	standalone: true,
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule,
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		PasswordStrengthBarComponent,
	],
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent {
	@Output() login = new EventEmitter<LoginFormData>();

	// This is a public property in JavaScript
	// registerForm: FormGroup;
	hide = true;

	// # is a private property in JavaScript
	// Typesafe Error messages for each form control
	#errorMap: LoginFormErrorType = {
		email: {
			required: 'email is required',
			email: 'email is not valid',
		},
		password: {
			required: 'password is required',
			weak: 'password not strong enough',
		},
	};

	// Type Safe Forms from Angular v14 ---------------------
	// registerForm = inject(FormBuilder).nonNullable.group({
	loginForm: FormGroup<LoginFormType> = inject(FormBuilder).nonNullable.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, CustomValidators.passwordStrength(3)]],
	});

	// Gets the control by name in a typesafe way
	getControlByName(controlName: keyof LoginFormData) {
		// return this.registerForm.get(controlName);
		return this.loginForm.controls[controlName];
	}

	// Gets the control error in a typesafe way
	hasControlError(controlName: keyof LoginFormData): boolean {
		// return !this.registerForm.get(controlName)?.valid ?? false;
		// ?. and ?? not needed, we are typesafe
		return this.getControlByName(controlName).invalid;
	}

	// Gets the control error message in a typesafe way
	getControlErrorMessage(controlName: keyof LoginFormData): string {
		// Get the control, e.g. password control
		// const control = this.registerForm.get(controlName);
		const control = this.getControlByName(controlName);

		// Get the first error key
		// e.g. password errors: `Object { required: {}, weak: {…} }` -> `required`
		const firstErrorKey = control.errors ? Object.keys(control.errors)[0] : '';

		// Lookup and return the error message, e.g. `password is required`
		return this.#errorMap[controlName][firstErrorKey];
	}

	// Called when the register button is clicked
	onLogin() {
		// console.log('form object', this.registerForm);
		this.login.emit(this.loginForm.value as LoginFormData);
	}
}
