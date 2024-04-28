import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BasicAuthInterceptor, ErrorInterceptor } from '@insta/data/auth';
import { LoginContainerComponent, RegisterContainerComponent } from '@insta/feat/auth';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserDataModule } from '@insta/data/user';
import { PostDataModule } from '@insta/data/post';

// A module is a container for components, directives, pipes, and services
// All of our components, directives, pipes, and services must be declared in a module
@NgModule({
	declarations: [AppComponent],
	imports: [
		// Needed for HttpClient
		HttpClientModule,

		BrowserModule,
		BrowserAnimationsModule,
		RegisterContainerComponent,
		LoginContainerComponent,

		// data modules have store, store needs to be ready when app starts
		UserDataModule,
		PostDataModule,

		// Root Routing
		RouterModule.forRoot(appRoutes, { useHash: true }),

		// Root Data Store
		StoreModule.forRoot(
			{},
			{
				metaReducers: [],
				runtimeChecks: {
					strictActionImmutability: true,
					strictStateImmutability: true,
				},
			}
		),

		StoreDevtoolsModule.instrument({ maxAge: 25, connectInZone: true }),

		// Root Effects
		EffectsModule.forRoot([]),

		// Root Routing -> Root Data Store
		StoreRouterConnectingModule.forRoot(),
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: BasicAuthInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {
	// router = inject(Router);
	// route = inject(ActivatedRoute);

	// Routing

	constructor() {
		// Subscribe to router events
		/*
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationStart) {
				console.log('NavigationStart event:', event);
			} else if (event instanceof RoutesRecognized) {
				console.log('RoutesRecognized event:', event);
			} else if (event instanceof RouteConfigLoadStart) {
				console.log('RouteConfigLoadStart event:', event);
			} else if (event instanceof RouteConfigLoadEnd) {
				console.log('RouteConfigLoadEnd event:', event);
			} else if (event instanceof NavigationEnd) {
				console.log('NavigationEnd event:', event);
			} else if (event instanceof NavigationCancel) {
				console.log('NavigationCancel event:', event);
			} else if (event instanceof NavigationError) {
				console.log('NavigationError event:', event);
			} else if (event instanceof ChildActivationStart) {
				console.log('ChildActivationStart event:', event);
			} else if (event instanceof ChildActivationEnd) {
				console.log('ChildActivationEnd event:', event);
			}
		});
     */
		// 1. ------ NavigateByUrl ------
		// Absolute Path Route as a string
		// this.router.navigateByUrl('/products/123');
		// 2. ------ Navigate ------
		// Absolute Path Route as an array of url segments
		// Navigates to '/products'
		// const productId = 123;
		// this.router.navigate(['/products', productId]);
		// 3. ------ Navigate ------
		// To Relative Sibling Route as an array of url segments
		// Navigate to a sibling route
		// this.router.navigate(['../sibling'], { relativeTo: this.route });
		// 4. ------ Navigate ------
		// To Child Route as an array of url segments
		// this.router.navigate(['./child'], { relativeTo: this.route });
	}
}
