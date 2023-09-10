import { Component, inject, OnInit } from '@angular/core';
import { Todo, TodoHttpService } from '@todo-demo/data';

// WHY THIS CLASS
// --------------
// Smart components (in feature libraries) representing features in our frontend.
// A feature is a like a business use case.

// Smart components perform logic for how a feature should work
// and use multiple UI components (in ui libraries) for presentation
// and services (in data libraries) for dealing with data and http.

@Component({
	selector: 'feat-todo',
	template: `
		<!-- Here are UI Components -->

		<section class="todoapp">
			<ui-todo-header (add)="onAdd($event)"> </ui-todo-header>

			<ui-todo-list
				[todos]="todos"
				(delete)="onDelete($event)"
				(update)="onUpdate($event)"
			></ui-todo-list>

			<ui-todo-footer [todos]="todos"></ui-todo-footer>
		</section>
	`,
	styles: [],
})
export class TodoComponent implements OnInit {
	private todoService = inject(TodoHttpService);

	// --- STATE ---
	// Here we store our state (the todu array),
	// If the state is changing, by immutable updating the state (change reference)
	// then Angular will push the new state to all UI Components.
	todos: Todo[] = [];

	// todos: Todo[] = [
	// 	{ id: '1', title: 'Banana', completed: false },
	// 	{ id: '2', title: 'Apple', completed: false },
	// 	{ id: '3', title: 'Strawberry', completed: false },
	// ];

	// --- CONSTRUCTOR ---
	// Called: By Angular, every time the component gets instantiated.
	// Use Case: Initial setup, dependency injection.
	constructor() {
		console.log('TodoComponent # CTOR');
	}

	// --- ON INIT ---
	// Called: By Angular, once the component is initialized, used for setup work.
	// Use Case: Ideal for component initialization logic such as getting data from a service.
	ngOnInit(): void {
		console.log('TodoComponent # INIT');

		// We ask the server to give us all the `todu`.
		// The `Promise then` is executed when we receive the server response.
		this.todoService.getTodos().then((todos) => {
			console.log('TodoComponent # INIT (server response)', todos);
			this.todos = todos;
		});

		console.log('TodoComponent # INIT END');
	}

	// --- ADD TODU ----

	// EventHandlers always `on...`
	onAdd(addedTodo: Todo) {
		console.log('TodoComponent # ADD', addedTodo);

		// We sent the new `todu` to the server, after we update our store.
		// This is called _Pessimistic Update_ because we wait for the server first.
		// The `Promise then` is executed when we receive the server response.
		this.todoService.createTodo(addedTodo).then((todoBack) => {
			console.log('TodoComponent # ADD (server response)', todoBack);

			// Immutable update state by creating a new array
			// with the new `todu` returned from the server.
			this.todos = [...this.todos, todoBack];
		});

		console.log('TodoComponent # ADD END', addedTodo);
	}

	// --- DELETE TODU ----

	onDelete(deletedTodo: Todo) {
		console.log('TodoComponent # DELETE', deletedTodo);

		// We sent the `todu-Id` to the server, after we update the store.
		// This is called `_Pessimistic Update_` because we wait for the server first.
		// The `Promise then` is executed when we receive the server response.
		this.todoService.deleteTodo(deletedTodo.id!).then(() => {
			console.log('TodoComponent # DELETE (server response)');

			// Immutable update state by creating a new array
			// without the deleted `todu`.
			this.todos = this.todos.filter((todo) => todo.id !== deletedTodo.id);
		});

		console.log('TodoComponent # DELETE END', deletedTodo);
	}

	// --- UPDATE TODU ----

	onUpdate(updatedTodo: Todo) {
		console.log('TodoComponent # UPDATE', updatedTodo);

		// We sent the `todu` to the server, after we update the store.
		// This is called `_Pessimistic Update_` because we wait for the server first.
		// The `Promise then` is executed when we receive the server response.
		this.todoService.updateTodo(updatedTodo).then((todoBack) => {
			console.log('TodoComponent # UPDATE (server response)', todoBack);

			// Immutable update state by creating a new array
			// with updated todu returned from the server.
			this.todos = this.todos.map((todo) => {
				if (todo.id === todoBack.id) {
					return todoBack;
				} else {
					return todo;
				}
			});
		});

		console.log('TodoComponent # UPDATE END', updatedTodo);
	}
}
