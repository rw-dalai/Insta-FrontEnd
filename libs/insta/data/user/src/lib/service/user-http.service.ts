import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserRegistrationCommand } from '../actions/user.actions';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from '../model/user-domain.model';

// A Http Service is responsible for sending data to the server.

// The FrontEnd sends `Commands` go to the Server e.g. `UserRegistrationCommand`
// The Server responses with `Views`. e.g. `UserView`.

// Right now for testing purposes we respond with the Backend Domain model `User`.

@Injectable({ providedIn: 'root' })
export class UserHttpService {
	//
	private http = inject(HttpClient);

	// constructor(private http: HttpClient) {
	// }

	// TODO Server should response with `void`. `User` is just for Testing.
	register(command: UserRegistrationCommand): Promise<User> {
		// `firstValueFrom` turns an `Observable` into a `Promise`
		return firstValueFrom(this.http.post<User>('/api/registration', command));
	}

	login(headers: HttpHeaders): Promise<User> {
		return firstValueFrom(this.http.get<User>('/api/user', { headers }));
	}

	// TODO more user http stuff
	// updateProfile
}
