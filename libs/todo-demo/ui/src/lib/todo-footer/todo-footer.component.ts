import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Todo } from '@todo-demo/data';

// ANGULAR CHANGE DETECTION STRATEGY (ON PUSH)
// -------------------------------------------
// changeDetection: ChangeDetectionStrategy.OnPush,

// When we set a component's change detection strategy to OnPush,
// Angular will only check and update the component when:

// 1. Any of its input properties change (change detected by reference check).
// 2. An event handler in the component gets invoked (like a button click handler).

@Component({
	selector: 'ui-todo-footer',
	templateUrl: './todo-footer.component.html',
	styleUrls: ['./todo-footer.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFooterComponent {
	// Property Binding
	// Getting data from the parent
	@Input() todos: Todo[] = [];
}
