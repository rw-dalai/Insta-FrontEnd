// (username,password) -> 'Basic base64(username:password)'
// btoa('rene@gmx.at:123456') -> "cmVuZUBnbXguYXQ6MTIzNDU2"
import { HttpHeaders } from '@angular/common/http';
import { AUTH_HEADER, AuthToken } from '../model/auth.model';

// We need to send the Authorization header with the request
// "Authorization: <type> <credentials>"
// const headers = new HttpHeaders({
//   'Authorization': 'Basic ' + btoa(command.email + ':' + command.password)
// });

export function generateAuthToken(username: string, password: string): AuthToken {
	return `Basic ${btoa(username + ':' + password)}`;
	// return 'Basic ' + btoa(username + ':' + password);
}

export function appendAuthHeader(headers: HttpHeaders, authToken: AuthToken): HttpHeaders {
	return headers.set(AUTH_HEADER, authToken);
}
