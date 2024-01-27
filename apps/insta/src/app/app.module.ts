import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from '@insta/data/auth';
import { RegisterContainerComponent } from '@insta/feat/auth';

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
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptorService,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
