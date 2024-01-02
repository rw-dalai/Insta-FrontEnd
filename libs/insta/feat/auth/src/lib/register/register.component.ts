// 2 kinds of Angular Forms
// - Template Driven Forms
// - Reactive Forms

// Validation
// - Build in validation
// - Custom validation

// Forms Model
// - FormArray
// - FormGroup
// - FormControl

// Form State
// - ng-valid vs ng-invalid
// Is the form or the form control valid?

// - ng-pristine vs ng-dirty
// Has the form or form control's value been changed?

// - ng-untouched vs ng-touched
// Has the form or form control been visited?

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// TODO IntelliJ Bug ?
import { CustomValidators } from '@insta/util';
// import { CustomValidators } from '../../../../../util';

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
	],
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
	// This is a public property in JavaScript
	registerForm: FormGroup;
	hide = true;

	// # is a private property in JavaScript
	// Error messages for each form control
	#errorMap: Record<string, Record<string, string>> = {
		email: {
			required: 'email is required',
			email: 'email is not valid',
		},
		password: {
			required: 'password is required',
			weak: 'password not strong enough',
		},
		passwordConfirm: {
			required: 'password confirm is required',
			mismatch: 'passwords do not match',
		},
	};

	// Constructor is used to create the form
	constructor() {
		this.registerForm = new FormGroup(
			{
				// --------- Email ---------
				email: new FormControl('', [
					// This is a built-in validator
					Validators.required,
					Validators.email,
				]),
				// --------- Password ---------
				password: new FormControl('', [
					Validators.required,
					// This is a custom validator
					CustomValidators.passwordStrength(3),
				]),
				// --------- PasswordConfirm ---------
				passwordConfirm: new FormControl('', [
					Validators.required,
					CustomValidators.match('password'),
				]),

				// Group Validator
			} /*CustomValidators.match2('password', 'passwordConfirm')*/
		);
	}

	// Does the form control have an error?
	hasError(controlName: string): boolean {
		return !this.registerForm.get(controlName)?.valid ?? false;
	}

	// Get the error message for the form control
	getErrorMessage(controlName: string): string {
		// Get the control
		// e.g. password control
		const control = this.registerForm.get(controlName);

		// Get the first error key
		// e.g. password errors: `Object { required: {}, weak: {…} }` -> `required`
		const firstErrorKey = control?.errors ? Object.keys(control.errors)[0] : '';

		// Lookup and return the error message
		// e.g. `password is required`
		return this.#errorMap[controlName][firstErrorKey];
	}

	// Called when the register button is clicked
	onRegister() {
		console.log('register button clicked', this.registerForm);
	}
}
