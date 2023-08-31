import { Component } from '@angular/core';

@Component({
	selector: 'feat-todo',
	template: `
		<ui-todo-header></ui-todo-header>
		<ui-todo-list></ui-todo-list>
		<ui-todo-footer></ui-todo-footer>
	`,
	styles: [],
})
export class TodoComponent {
	// private todoService = inject(TodoHttpService);
}
