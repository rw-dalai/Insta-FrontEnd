import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as UserActions from './user.actions';
import * as UserFeature from './user.reducer';

@Injectable()
export class UserEffects {
	private actions$ = inject(Actions);

	init$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.initUser),
			switchMap(() => of(UserActions.loadUserSuccess({ user: [] }))),
			catchError((error) => {
				console.error('Error', error);
				return of(UserActions.loadUserFailure({ error }));
			})
		)
	);
}
