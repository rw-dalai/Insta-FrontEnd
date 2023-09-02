import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import { Todo } from '@todo-demo/data';

// Angular Change Detection Strategy
// OnPush = only react on reference change
// changeDetection: ChangeDetectionStrategy.OnPush,

@Component({
	selector: 'ui-todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit, OnChanges, OnDestroy {
	// Property Binding
	@Input() todos: Todo[] = [];

	// Only once
	// The component is created
	constructor() {
		console.log('TodoListComponent # ctor');
	}

	// Called many times
	// Whenever input properties change
	ngOnChanges(changes: SimpleChanges): void {
		console.log('TodoListComponent # on changes', changes);
	}

	// Only once
	// The component has been fully initialized
	ngOnInit(): void {
		console.log('TodoListComponent # on init');
	}

	// Only once
	// Before the component is destroyed
	ngOnDestroy(): void {
		console.log('TodoListComponent # on destroy');
	}
}
