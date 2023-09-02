import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'todo-demo-root',
	template: '<feat-todo></feat-todo>',
	styles: [''],
})
export class AppComponent implements OnInit {
	constructor() {
		console.log('AppComponent # ctor');
	}

	ngOnInit(): void {
		console.log('AppComponent # on init');
	}
}
