import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '@todo-demo/data';

@Component({
	selector: 'ui-todo-header',
	templateUrl: './todo-header.component.html',
	styleUrls: ['./todo-header.component.css'],
})
export class TodoHeaderComponent {
	// Event Binding
	// Emitting data back to the parent
	@Output() add = new EventEmitter<Todo>();

	// Used for 2-way data binding -> [()]
	title = '';

	onAdd() {
		// We create a new todu (without id).
		const todo: Todo = { title: this.title, completed: false };

		// We emit the event to the parent.
		this.add.emit(todo);

		// Clear the input field
		this.title = '';
	}
}
