// (username,password) -> 'Basic base64(username:password)'
// btoa('rene@gmx.at:123456') -> "cmVuZUBnbXguYXQ6MTIzNDU2"
import { HttpHeaders } from '@angular/common/http';
import { AUTH_HEADER, AuthToken } from '../model/auth.model';

export function generateAuthToken(username: string, password: string): AuthToken {
	// return `Basic ${btoa(username + ':' + password)}`;
	// Buffer.from(`Basic ${btoa(username + ':' + password)}`).toString('base64);

	const credentials = `${username}:${password}`;
	const credentials64 = btoa(credentials);
	const type = 'Basic';
	return `${type} ${credentials64}`;
}

export function appendAuthHeader(headers: HttpHeaders, authToken: AuthToken): HttpHeaders {
	return headers.set(AUTH_HEADER, authToken);
}
