import { Component } from '@angular/core';
import { Todo } from '@todo-demo/data';

@Component({
	selector: 'feat-todo',
	template: `
		<ui-todo-header [ueberschrift]="'Todo Header'" (add)="onAdd($event)">
		</ui-todo-header>

		<ui-todo-list [todos]="todos"> </ui-todo-list>

		<ui-todo-footer [todos]="todos"> </ui-todo-footer>
	`,
	styles: [],
})
export class TodoComponent {
	// private todoService = inject(TodoHttpService);

	header = 'Dr. Saina Todo Liste';

	todos: Todo[] = [
		{ id: '1', title: 'Banana', completed: false },
		{ id: '2', title: 'Apple', completed: false },
		{ id: '3', title: 'Strawberry', completed: false },
	];

	onAdd(todo: Todo) {
		console.log('TodoComponent#onAdd', todo);
		console.log('TodoComponent#onAdd', this.todos);

		// mutable update
		this.todos.push(todo);

		// immutable update
		// Destructuring ...
		// todo.id = this.todos.length
		// this.todos = [ ...this.todos, todo ];

		console.log('TodoComponent#onAdd', this.todos);
	}
}
