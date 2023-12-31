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
	],
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
	registerForm: FormGroup;

	constructor() {
		this.registerForm = new FormGroup({
			// firstName: new FormControl(),
			// lastName: new FormControl(),
			email: new FormControl('', [Validators.required, Validators.email]),
			// password: new FormControl('', [Validators.required]),
			// passwordConfirm: new FormControl('', [Validators.required]),
		});
	}

	onRegister() {
		console.log('register button clicked', this.registerForm);
	}

	// 2 kinds of Angular Forms
	// - Template Driven Forms
	// - Reactive Forms

	// Validation
	// Forms Model
	// - FormControl
	// - FormGroup
	// - FormArray

	// Form State
	// - ng-valid vs ng-invalid
	// Is the form or the form control valid?

	// - ng-pristine vs ng-dirty
	// Has the form or form control's value been changed?

	// - ng-untouched vs ng-touched
	// Has the form or form control been visited?

	// Angular 17
	// Signals
	// RxJs

	// Angular 18
	// Signal based Components
}
