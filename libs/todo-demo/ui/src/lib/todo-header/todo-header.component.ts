import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '@todo-demo/data';

@Component({
	selector: 'ui-todo-header',
	templateUrl: './todo-header.component.html',
	styleUrls: ['./todo-header.component.css'],
})
export class TodoHeaderComponent {
	// Property Binding
	// @Input() ueberschrift = '';

	// Event Binding
	@Output() add = new EventEmitter<Todo>();

	title = '';

	onEnter() {
		// console.log('onEnter', this.title);

		const todo: Todo = { title: this.title, completed: false };

		this.add.emit(todo);
	}
}
