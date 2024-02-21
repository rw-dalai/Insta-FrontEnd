import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginContainerComponent } from './login/login-container.component';
import { RegisterContainerComponent } from './register/register-container.component';

// /auth

export const featureAuthRoutes: Route[] = [
	{ path: '', pathMatch: 'prefix', redirectTo: 'login' },

	// static route
	{ path: 'login', component: LoginContainerComponent },

	// static route
	{ path: 'register', component: RegisterContainerComponent },

	// catch all route
	// { path: '**', redirectTo: 'login' }
];
