import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo.model';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class TodoHttpService {
	private http = inject(HttpClient);

	// constructor() { }

	// public getTodos(): Observable<Todo[]> {
	//   return this.http.get<Todo[]>('/api/todo');
	// }

	public getTodos(): Promise<Todo[]> {
		return lastValueFrom(this.http.get<Todo[]>('/api/todo'));
	}

	// public createTodo(todo: Todo): Observable<Todo> {
	//   // const todo: Todo = { title: 'item1', completed: false };
	//   return this.http.post<Todo>('/api/todo', todo);
	// }

	public createTodo(todo: Todo): Promise<Todo> {
		// const todo: Todo = { title: 'item1', completed: false };
		return lastValueFrom(this.http.post<Todo>('/api/todo', todo));
	}
}
