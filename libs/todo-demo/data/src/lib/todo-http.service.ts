import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo.model';
import { lastValueFrom, Observable } from 'rxjs';

// WHY THIS CLASS
// --------------
// This class deals with the connection to the backend API.
// We can observe all HTTP calls in the browser's network tab.

// @Injectable
// -----------
// An Angular Service, can be used (injected) anywhere in our application.
// Usually in Feature Libraries (Smart Component)

@Injectable({
	providedIn: 'root',
})
export class TodoHttpService {
	// - Tells Angular to give us (inject) the HTTP Client.
	private http = inject(HttpClient);

	// - Old way in Angular to give us (inject) dependencies, better use `inject`.
	// constructor(private http: HttpClient) { }

	// - Without `lastValueFrom` the HTTP Client returns us an `Observable`.
	// https://angular.io/guide/observables
	// public getTodos(): Observable<Todo[]> {
	//   return this.http.get<Todo[]>('/api/todo');
	// }

	// - With `lastValueFrom` we turn the `Observable` into a native JavaScript `Promise`.
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

	// - We ask the server to gives us all the `todu`, so we can display it.
	public getTodos(): Promise<Todo[]> {
		return lastValueFrom(this.http.get<Todo[]>('/api/todo'));
	}

	// - We send the `todu` to the server (no id) and the server saves it into the DB
	// and returns it back (with id) with HTTP 201 (CREATED) status code.
	public createTodo(todo: Todo): Promise<Todo> {
		return lastValueFrom(this.http.post<Todo>('/api/todo', todo));
	}

	// - We sent the `todu` to the server and the server updates all the fields in the DB
	// and returns it back with success HTTP 200 (SUCCESS) status code
	public updateTodo(todo: Todo): Promise<Todo> {
		return lastValueFrom(this.http.put<Todo>(`/api/todo/${todo.id}`, todo));
	}

	// - We sent the `todoId` to the server and the server deletes it from the DB
	// and returns nothing with success HTTP 204 (NO_CONTENT) status code.
	public deleteTodo(todoId: string): Promise<void> {
		return lastValueFrom(this.http.delete<void>(`/api/todo/${todoId}`));
	}
}
