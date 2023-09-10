import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
	SimpleChanges,
} from '@angular/core';
import { Todo } from '@todo-demo/data';

// ANGULAR CHANGE DETECTION STRATEGY (ON PUSH)
// -------------------------------------------
// changeDetection: ChangeDetectionStrategy.OnPush,

// When we set a component's change detection strategy to OnPush,
// Angular will only check and update the component when:

// 1. Any of its input properties change (change detected by reference check).
// 2. An event handler in the component gets invoked (like a button click handler).

@Component({
	selector: 'ui-todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit, OnChanges, OnDestroy {
	// Property Binding
	// Getting data from the parent component
	@Input() todos: Todo[] = [];

	// Event Binding
	// Emit data back to the parent component
	// EventEmitters always _without_ `on...`
	@Output() delete = new EventEmitter<Todo>();
	@Output() update = new EventEmitter<Todo>();

	// --- CONSTRUCTOR ---
	// Called: By Angular, every time the component gets instantiated.
	// Use Case: Initial setup, dependency injection.
	constructor() {
		console.log('TodoListComponent # CTOR');
	}

	// --- ON CHANGES ---
	// Called: Whenever one of the input properties changes
	// (before ngOnInit and whenever inputs change).
	// Use Case: Use it to react to changes in input properties,
	// for example to fetch new data after the input changed.
	ngOnChanges(changes: SimpleChanges): void {
		console.log('TodoListComponent # CHANGES', changes);
	}

	// --- ON INIT ---
	// Called: By Angular, once the component is initialized, used for setup work.
	// Use Case: Ideal for component initialization logic such as getting data from a service.
	ngOnInit(): void {
		console.log('TodoListComponent # INIT');
	}

	// --- ON DESTROY ---
	// Called: To implement cleanup logic before the component is destroyed.
	// Use Case: To perform cleanup actions
	ngOnDestroy(): void {
		console.log('TodoListComponent # DESTROY');
	}

	// --- DELETE ----
	// EventHandlers always _with_ `on...`
	onDelete(todo: Todo) {
		// We emit the delete event to the parent component and pass the todu with it.
		this.delete.emit(todo);
	}

	// --- TOGGLE COMPLETE ---
	onToggleComplete(todo: Todo) {
		// We immutable update the todu.
		const updatedTodo: Todo = { ...todo, completed: !todo.completed };

		// We emit the updated event to the parent component and pass the todu with it.
		this.update.emit(updatedTodo);
	}

	// --- CHANGE TITLE ---
	onChangeTitle(todo: Todo, event: Event) {
		// Get the title from the input event
		const newTitle = (event.target as HTMLInputElement).value;

		// We immutable update the todu.
		const updatedTodo: Todo = { ...todo, title: newTitle };

		// We emit the updated event to the parent component and pass the todu with it.
		this.update.emit(updatedTodo);
	}
}
