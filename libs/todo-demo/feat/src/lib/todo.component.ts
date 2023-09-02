import { Component, inject, OnInit } from '@angular/core';
import { Todo, TodoHttpService } from '@todo-demo/data';

// Feature Library
// Smart Component
@Component({
	selector: 'feat-todo',
	template: `
		<!--		<ui-todo-header [ueberschrift]="'Todo Header'" (add)="onAdd($event)">-->
		<ui-todo-header (add)="onAdd($event)"> </ui-todo-header>

		<ui-todo-list [todos]="todos"></ui-todo-list>

		<ui-todo-footer [todos]="todos"></ui-todo-footer>
	`,
	styles: [],
})
export class TodoComponent implements OnInit {
	private todoService = inject(TodoHttpService);

	// State
	// todos: Todo[] = [
	// 	{ id: '1', title: 'Banana', completed: false },
	// 	{ id: '2', title: 'Apple', completed: false },
	// 	{ id: '3', title: 'Strawberry', completed: false },
	// ];

	// State
	todos: Todo[] = [];

	constructor() {
		console.log('TodoComponent # ctor');
	}

	// There are no input properties thus no changes
	// ngOnChanges(changes: SimpleChanges): void {
	//   console.log('TodoComponent # on changes');
	// }

	ngOnInit(): void {
		console.log('TodoComponent # on init');

		this.todoService.getTodos().then((todos) => {
			console.log('todos from the server', todos);
			this.todos = todos;
		});

		console.log('TodoComponent # on init end');
	}

	onAdd(todo: Todo) {
		// mutable update
		// [Banana, Apple, Strawberry, Cola]
		// this.todos.push(todo);
		// immutable update
		// shallow copy
		// We have a new array thus a new reference
		// this.todos = [ ...this.todos, todo ];
		// this.todos = this.todos.concat(todo);
		// api request
		// on response immutable update todo array
	}

	onDelete() {
		// api request
		// on response immutable update todo array
	}

	onUpdate() {
		// api request
		// on response immutable update todo array
	}
}
