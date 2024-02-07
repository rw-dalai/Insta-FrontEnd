// Angular Service

// Auth Service Responsibility

// - Provide Basic Auth Header
// - Save Basic Auth Header

// 1. register
// -> UserService#register

// 2. login
// -> Append Basic Auth Header
// -> On Success, save Auth Header

// 3. logout
// -> Remove Basic Auth Header

import { inject, Injectable } from '@angular/core';
import { HttpHeaders, HttpRequest } from '@angular/common/http';
import { AuthToken } from '../model/auth.model';
import { appendAuthHeader, generateAuthToken } from '../utils/auth.util';
import { UserHttpService, UserRegistrationCommand, UserLoginCommand, User } from '@insta/data/user';

// import { UserRegistrationCommand, UserHttpService } from '@insta/data/user';

// Basic Auth
@Injectable({ providedIn: 'root' })
export class BasicAuthService {
	// Should be only set if the credentials are valid if invalid keep null
	#authToken: AuthToken | null = null;

	private userHttpService = inject(UserHttpService);

	// private  userHttpService: UserHttpService;
	// constructor(private userHttpService: UserHttpService) {
	// }

	register(command: UserRegistrationCommand): Promise<User> {
		console.log('BasicAuthService#register', command);

		return this.userHttpService.register(command);
	}

	// username, password
	login(command: UserLoginCommand) {
		console.log('BasicAuthService#login', command);

		// 'Basic cmVuZUBnbXguYXQ6MTIzNDU2'
		const authToken = generateAuthToken(command.email, command.password);

		// Authorization: <type> <credentials>
		const headers = appendAuthHeader(new HttpHeaders(), authToken);

		return this.userHttpService.login(headers).then(() => (this.#authToken = authToken));
		// .catch((error) => this.#authToken = null)
	}

	logout() {
		// TODO
		this.#authToken = null;
	}

	appendAuthHeader(req: HttpRequest<any>): HttpRequest<any> {
		if (this.#authToken == null) return req;

		return req.clone({
			headers: appendAuthHeader(req.headers, this.#authToken),
		});
	}
}
