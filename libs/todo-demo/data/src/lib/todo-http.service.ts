import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo.model';
import { lastValueFrom } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class TodoHttpService {
	private http = inject(HttpClient);

	// constructor() { }

	public createTodo(todo: Todo): Promise<Todo> {
		// const todo: Todo = { title: 'item1', completed: false };
		return lastValueFrom(this.http.post<Todo>('/api/todo', todo));
	}
}
