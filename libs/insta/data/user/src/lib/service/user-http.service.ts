import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserRegistrationCommand } from '../actions/user.actions';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { User } from '../model/user-domain.model';

// A Http Service is responsible for sending data to the server.

// The FrontEnd sends `Commands` go to the Server e.g. `UserRegistrationCommand`
// The Server responses with `Views`. e.g. `UserView`.

// Right now for testing purposes we respond with the Backend Domain model `User`.

// Programming Paradigms
// Object Oriented Programming (OOP)
// Functional Programming (FP)
// Reactive Programming (RP)

// Observable
// not native to the Browser (library is need e.g. RxJs)
// 0..n data in the over time, n can be INFINITY (never completes)
// set up an execution pipeline with powerful operators
// compose observables in a united stream of one final observables
// it is only executed when you `subscribe`

// Promise
// native to Browser
// 0..1 data over time
// fulfilled / rejected
// then/catch
// no need to subscribe, it just gets executed

@Injectable({ providedIn: 'root' })
export class UserHttpService {
	private http = inject(HttpClient);

	// constructor(private http: HttpClient) {
	// }

	// TODO Server should response with `void`. `User` is just for Testing.
	register(command: UserRegistrationCommand): Promise<User> {
		// `firstValueFrom` turns an `Observable` into a `Promise`
		return lastValueFrom(this.http.post<User>(`/api/registration`, command));
	}

	login(headers: HttpHeaders): Promise<User> {
		return lastValueFrom(this.http.get<User>('/api/user/login', { headers }));
	}
}

/*
RETRY DEMO ---------
return lastValueFrom(this.http.post<User>('/api/registration', command)
  .pipe(
    // Automatically re-subscribes to the source-observable
    // up to n times (e.g. 3 times) in case of errors
    retry(3)
  ));

 */

/*
CATCH ERROR ---------
return lastValueFrom(this.http.post<User>('/api/registration', command)
.pipe(
 // Catches errors on the source-observable and returns a new observable.
 // CAUTION: Once an observable is in an error state, its DEAD !
 // - Returns an error:
 catchError((err) =>  throwError(() => new Error('registration failed for reason: ' + err)))
 // - Returns a fallback value:
 catchError((err) =>  of(..))
));
*/

/*
TIMEOUT ---------
return lastValueFrom(this.http.post<User>('/api/registration', command)
  .pipe(
    // Throws and error if the source-observable does not emit a value
    // within a specified duration (e.g. 5 seconds)
    timeout(5000),
    catchError((err) =>  throwError(() => new Error('registration timedout: ' + err)))
  ));

 */

/*
  // MERGE MAP --------
  // mergeMap, concatMap, switchMap, exhaustMap

  // 1. First Observable (called the `Source Observable`)
  return lastValueFrom(this.http.post<User>('/api/request1', command)
    .pipe(
      // Projects the source-observable value to a new Observable
      // 2. Observable (called `Inner Observable`)
      mergeMap((dataRequest1) => this.http.post<User>('/api/request2', dataRequest1)),
    ));
    */
