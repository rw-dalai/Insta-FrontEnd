import { inject, Injectable } from '@angular/core';
import { BasicAuthService } from './basic-auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
	private authService = inject(BasicAuthService);

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// append basic auth header
		const reqWithAuthHeaders = this.authService.appendAuthHeader(req);

		// call next interceptor
		return next.handle(reqWithAuthHeaders);
	}
}
