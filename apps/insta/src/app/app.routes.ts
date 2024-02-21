import { Route } from '@angular/router';
import {
	featureAuthRoutes,
	LoginContainerComponent,
	RegisterContainerComponent,
} from '@insta/feat/auth';

// static routes
// PREFIX routing is not relevant
// - no routing params
// - no child routes
// - no wildcard route

// dynamic routes
// PREFIX routing is relevant

// more specific routes to the top
// less specific routes to the bottom

export const appRoutes: Route[] = [
	// DEFAULT ROUTE
	// { path: '', pathMatch: 'full', redirectTo: 'timeline', },
	{ path: '', pathMatch: 'full', redirectTo: '/auth/login' },

	// static route, prefix matching is not relevant
	// { path: 'products', component: ProductListContainerComponent },

	// dynamic route, prefix matching important
	// { path: 'products/detail/:id', component: ProductDetailContainerComponent },

	// dynamic route, prefix matching important
	// AUTH ROUTES with CHILDREN
	// { path: 'auth', children: [
	//   { path: 'login', component: LoginContainerComponent },
	//   { path: 'register', component: RegisterContainerComponent }
	// ] },

	// child routes are a concern of the library and not the app route
	{ path: 'auth', children: featureAuthRoutes },

	// CATCH ALL ROUTE
	{ path: '**', redirectTo: '/auth/login' },
	// { path: '**', component: NotFoundComponent },
];
