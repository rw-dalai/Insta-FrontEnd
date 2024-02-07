import { Injectable } from '@angular/core';
import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, retry, tap, throwError, timer } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	private retryDelay = 1000;
	private retryMaxAttempts = 3;

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// NAIVE VERSION

		/*
    return next.handle(req)
      .pipe(
        tap(() => console.error(`retry request ${req.url}`)),
        retry(this.retryMaxAttempts),
        catchError((error) => throwError(() =>
          new Error(`request ${req.url} failed after ${this.retryMaxAttempts}`)))
      // catchError((error) => {
      // throw new Error(`request ${req.url} failed after ${this.retryMaxAttempts}`); })
    )
     */

		return next.handle(req).pipe(
			tap(() => console.error(`retry request ${req.url}`)),
			retry({
				// Maximum number of retry attempts
				count: this.retryMaxAttempts,
				// The `Notifier Function` has to return an observable following the contract:
				// If the Observable throws an Error: no retry
				// If the Observable emits a value: then retry
				delay: (error, retryCount) => {
					if (shouldRetry(error))
						// Linear backoff
						// return timer(this.retryDelay)
						// Exponential backoff
						return timer(this.retryDelay * Math.pow(2, retryCount - 1));
					else return throwError(() => error);
				},
			}),
			catchError((error) =>
				throwError(() => new Error(`request ${req.url} failed after ${this.retryMaxAttempts}`))
			)

			// catchError((error) => {
			// throw new Error(`request ${req.url} failed after ${this.retryMaxAttempts}`); })
		);
	}
}

// Worthy Status Codes to retry ?
// 408 Request Timeout
// 429 Too Many Requests
// (500 Internal Server Error !?)
// 502 Bad Gateway
// 503 Service Unavailable
// 504 Gateway Timeout
// If no request was sent at all (no internet connection)

enum HttpStatusCodes {
	BadGateway = 502,
	ServiceUnavailable = 503,
	GatewayTimeout = 504,
	// etc.
}

const retryCodes = [
	HttpStatusCodes.BadGateway,
	HttpStatusCodes.ServiceUnavailable,
	HttpStatusCodes.GatewayTimeout,
];

// Here we can define under which circumstances we want to retry.
// e.g. Only GET requests, or specific status codes.
function shouldRetry(error: any): boolean {
	// 1. Retry if the error is coming from the Server and is one of our status codes
	if (error instanceof HttpErrorResponse && retryCodes.includes(error.status)) return true;

	return false;

	// 2. Retry if the error is e.g. no internet
	// TODO testing needed
	// return error.status === undefined || error.status === 0;
}
