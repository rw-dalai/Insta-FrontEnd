// This is a model for the view e.g. `login.component.ts`.
// It is not the model for our data e.g. `data/user/model`.

import { FormControl } from '@angular/forms';

export interface LoginFormData {
	email: string;
	password: string;
}

// type FormKeyType = 'email' | 'password' | 'passwordConfirm';

// Type for the form errors
export type LoginFormErrorType = Record<keyof LoginFormData, Record<string, string>>;

// Type for the form controls
// type RegisterFormType = Record<FormKeyType, FormControl<string>>;
export type LoginFormType = Record<keyof LoginFormData, FormControl<string>>;
