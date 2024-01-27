import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
	private authService = inject(AuthService);

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// append auth header
		const reqWithAuthHeaders = this.authService.appendAuthHeader(req);

		// call next interceptor
		return next.handle(reqWithAuthHeaders);
	}
}
