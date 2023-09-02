import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TodoDemoFeatModule } from '@todo-demo/feat';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, TodoDemoFeatModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
