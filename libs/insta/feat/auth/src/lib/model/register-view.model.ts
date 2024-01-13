// This is a model for the view e.g. `register.component.ts`.
// It is not the model for our data e.g. `data/user/model`.

import { FormControl } from '@angular/forms';

export interface RegisterFormData {
	email: string;
	password: string;
	passwordConfirm: string;
	firstName: string;
	lastName: string;
}

// type FormKeyType = 'email' | 'password' | 'passwordConfirm';

// Type for the form errors
export type RegisterFormErrorType = Record<keyof RegisterFormData, Record<string, string>>;

// Type for the form controls
// type RegisterFormType = Record<FormKeyType, FormControl<string>>;
export type RegisterFormType = Record<keyof RegisterFormData, FormControl<string>>;
