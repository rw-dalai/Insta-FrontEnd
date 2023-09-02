import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnChanges,
	SimpleChanges,
} from '@angular/core';
import { Todo } from '@todo-demo/data';

@Component({
	selector: 'ui-todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnChanges {
	// Property Binding
	@Input() todos: Todo[] = [];

	ngOnChanges(changes: SimpleChanges): void {
		console.log(changes);
	}
}
