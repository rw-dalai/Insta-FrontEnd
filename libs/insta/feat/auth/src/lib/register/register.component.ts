// Angular Forms ---------------------------------------------
// https://angular.io/guide/forms-overview
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

// Learn Typescript -------------------------------------------
// https://www.typescriptlang.org/docs/handbook/intro.html

// Typescript Basic Types ----------------------------------
// https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-oop.html
// string, number, boolean, null, undefined, any, unknown, never, void
// Try to avoid `any` and `unknown` as much as possible

// Typescript Advanced Concepts -------------------------
// interface = type for an object
// type = alias for a type
// keyof = union of all the keys in the object
// Record = HashMap / Dictionary with a key and value type

// Imports ----------------------------------------------------
// import { CustomValidators } from '@insta/util'; // -> OKAY
// import { CustomValidators } from '../../../../../util'; // -> NOT OKAY
// See `tsconfig.base.json` for the alias paths
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	FormBuilder,
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
import { CustomValidators } from '@insta/util';
import { PasswordStrengthBarComponent } from '@insta/ui/strengthbar';

// Type for the form data
// interface RegisterFormData {
type RegisterFormData = {
	email: string;
	password: string;
	passwordConfirm: string;
};

// Type for the form errors
type RegisterFormErrorType = Record<keyof RegisterFormData, Record<string, string>>;

// Type for the form controls
type RegisterFormType = Record<keyof RegisterFormData, FormControl<string>>;

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
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
	// This is a public property in JavaScript
	// registerForm: FormGroup;
	hide = true;

	// # is a private property in JavaScript
	// Typesafe Error messages for each form control
	#errorMap: RegisterFormErrorType = {
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
		// wrong: { ... } // does not work, we are typesafe
	};

	// Type Safe Forms from Angular v14 ---------------------
	// registerForm = inject(FormBuilder).nonNullable.group({
	registerForm: FormGroup<RegisterFormType> = inject(FormBuilder).nonNullable.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, CustomValidators.passwordStrength(3)]],
		passwordConfirm: ['', [Validators.required, CustomValidators.match('password')]],
	});

	// Inject vs Constructor
	// ----------------------------------------------------
	// With inject we can inject services into components.
	// private fb: FormBuilder = inject(FormBuilder);

	// Before inject we had to do this:
	// constructor(private fb: FormBuilder) {}

	// StandardForms before Angular v14 ---------------------
	// constructor() {
	//   this.registerForm = new FormGroup<RegisterFormType>({
	// 		email: new FormControl('', [
	// 			Validators.required,
	// 			Validators.email,
	// 		]),
	// 		password: new FormControl('', [
	// 			Validators.required,
	// 			CustomValidators.passwordStrength(3),
	// 		]),
	// 		passwordConfirm: new FormControl('', [
	// 			Validators.required,
	// 			CustomValidators.match('password'),
	// 		]),
	// 		// Group Validator
	// 	} /*CustomValidators.match2('password', 'passwordConfirm')*/
	// );
	// }
	// Gets the control by name in a typesafe way
	getControlByName(controlName: keyof RegisterFormData) {
		// return this.registerForm.get(controlName);
		return this.registerForm.controls[controlName];
	}

	// Gets the control error in a typesafe way
	hasControlError(controlName: keyof RegisterFormData): boolean {
		// return !this.registerForm.get(controlName)?.valid ?? false;
		// ?. and ?? not needed, we are typesafe
		return this.getControlByName(controlName).invalid;
	}

	// Gets the control error message in a typesafe way
	getControlErrorMessage(controlName: keyof RegisterFormData): string {
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
	onRegister() {
		console.log('form object', this.registerForm);
		// console.log('form value', this.registerForm.value);
	}
}
