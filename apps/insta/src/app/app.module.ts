import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Always import by alias paths
// See `tsconfig.base.json` for the alias paths
import { RegisterComponent } from '@insta/feat/auth';

// Never ever import by relative paths
// import { RegisterComponent } from '../../../../libs/insta/feat/auth/src';

// A module is a container for components, directives, pipes, and services
// All of our components, directives, pipes, and services must be declared in a module
@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, BrowserAnimationsModule, RegisterComponent],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
