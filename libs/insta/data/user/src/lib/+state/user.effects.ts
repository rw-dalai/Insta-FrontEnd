import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import * as UserActions from './user.actions';
import { BasicAuthService } from '@insta/data/auth';
import { UserLoginCommand, UserLoginResponse } from './user.actions';
import { Router } from '@angular/router';

// @Injectable()
// export class UserEffects {
// 	private actions$ = inject(Actions);
//
// 	init$ = createEffect(() =>
// 		this.actions$.pipe(
// 			ofType(UserActions.initUser),
// 			switchMap(() => of(UserActions.loadUserSuccess({ user: [] }))),
// 			catchError((error) => {
// 				console.error('Error', error);
// 				return of(UserActions.loadUserFailure({ error }));
// 			})
// 		)
// 	);
// }

// rxjs pipeline (tap, filter, map, catchError, switchMap, mergeMap, concatMap, exhaustMap)

@Injectable()
export class UserEffects {
	private actions$ = inject(Actions);
	private authService = inject(BasicAuthService);
	private router = inject(Router);

	loginUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.loginUser),
			switchMap((command: UserLoginCommand) =>
				this.authService.login(command).pipe(
					// tap((response)=> console.log('login user effect success', response)),
					switchMap((response: UserLoginResponse) => of(UserActions.loginUserSuccess(response))),
					tap(() => this.router.navigate(['/'])),
					catchError((error) => of(UserActions.loginUserFailure({ error })))
				)
			)
		)
	);

	// Once the pipeline has an error it will be dead forever

	// loginUser2$ = createEffect(() =>
	//   this.actions$.pipe(
	//     ofType(UserActions.loginUser),
	//     switchMap((command: UserLoginCommand) => this.authService.login(command)),
	//     switchMap((response: UserLoginResponse) => of(UserActions.loginUserSuccess(response))),
	//     catchError((error) => of(UserActions.loginUserFailure({ error }))),
	//   )
	// );
}
