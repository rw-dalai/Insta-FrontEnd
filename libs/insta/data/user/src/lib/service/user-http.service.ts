import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserRegistrationCommand } from '../actions/user.actions';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, retry, catchError, throwError, timeout, mergeMap } from 'rxjs';
import { User } from '../model/user-domain.model';

// A Http Service is responsible for sending data to the server.

// The FrontEnd sends `Commands` go to the Server e.g. `UserRegistrationCommand`
// The Server responses with `Views`. e.g. `UserView`.

// Programming Paradigms
// Object-Oriented Programming (OOP)
// Functional Programming (FP)
// Reactive Programming (RP)

// Object-Oriented Programming
// Solves the problem of handling data and behavior

// Functional Programming
// Solves the problem of handling data transformations

// Reactive Programming
// Solves the problem of handling asynchronous data streams

// Observable
// https://www.learnrxjs.io/
// not native to the Browser (library is need e.g. RxJs)
// 0..n data in the over time, n can be INFINITY (never completes)
// set up an execution pipeline with powerful operators
// compose observables in a united stream of one final observables
// it is only executed when you `subscribe`

// Promise
// https://developer.mozilla.org/en-US/plus
// native to Browser
// 0..1 data over time
// fulfilled / rejected
// then/catch
// no need to subscribe, it just gets executed

@Injectable({ providedIn: 'root' })
export class UserHttpService {
	// injection preferred over constructor injection
	private http = inject(HttpClient);

	// constructor(private http: HttpClient) {
	// }

	register(command: UserRegistrationCommand): Promise<User> {
		// `firstValueFrom` turns an `Observable` into a `Promise`
		return lastValueFrom(this.http.post<User>(`/api/registration`, command));
	}

	// login(headers: HttpHeaders): Promise<User> {
	login(): Promise<User> {
		// `firstValueFrom` turns an `Observable` into a `Promise`
		// return lastValueFrom(this.http.get<User>('/api/user', { headers }));
		// return lastValueFrom(this.http.get<User>('/api/user'));
		return lastValueFrom(this.http.get<User>('/api/user'));
	}

	// RxJs Demonstrations:

	// CATCH ERROR DEMO ---------------------------------------------------------
	// - Catches an error and replaces it with a new Observable
	// - If the source observable errors out, it's in an error state and will not emit anymore values
	catchErrorDemo(command: UserRegistrationCommand): Promise<User> {
		// this.http.post<User>('/api/request', command) -> Observable<User>
		// It's called the `Source Observable`
		return lastValueFrom(
			this.http.post<User>('/api/request', command).pipe(
				// - Replace with a new Error Observable:
				catchError((err) => throwError(() => new Error('blabla failed for reason: ' + err)))
				// - Replace with a new Value Observable:
				// catchError((err) =>  of(...))
			)
		);
	}

	/*
  // RETRY DEMO ---------------------------------------------------------------
  // - Retry tries to re-execute the source-observable if it errors out
  retryDemo(command: UserRegistrationCommand): Promise<User> {
    return lastValueFrom(this.http.post<User>('/api/request', command)
      .pipe(
        // Retry 3 times
        retry(3),
        // After the 3rd error, the source-observable will be in an error state
        catchError((err) =>  throwError(() => new Error('blabla failed for reason: ' + err)))
      ));
  }

  // Timeout DEMO -------------------------------------------------------------
  // - Throws an error if the source-observable does not emit a value within a specified duration
  timeoutDemo(command: UserRegistrationCommand): Promise<User> {
    return lastValueFrom(this.http.post<User>('/api/request', command)
      .pipe(
        timeout(5000),
        // After the timeout, the source-observable will be in an error state
        catchError((err) =>  throwError(() => new Error('registration timedout: ' + err)))
      ));
  }

  // MergeMap DEMO ------------------------------------------------------------
  // - Projects the source-observable value to a new Observable
  mergeMapDemo(command: UserRegistrationCommand): Promise<User> {
    // 1. First Observable (called the `Source Observable`)
    return lastValueFrom(this.http.post<User>('/api/request1', command)
      .pipe(
        // 2. Projects the source-observable value to a new Observable (called `Inner Observable`)
        mergeMap((dataRequest1) => this.http.post<User>('/api/request2', dataRequest1)),
      ));
  }
   */
}
