// import { Injectable, inject } from '@angular/core';
// import { createEffect, Actions, ofType } from '@ngrx/effects';
// import { switchMap, catchError, of } from 'rxjs';
// import * as PostActions from './post.actions';
// import * as PostFeature from './post.reducer';
//
import { Injectable } from '@angular/core';

@Injectable()
export class PostEffects {
	// private actions$ = inject(Actions);
	//
	// 	init$ = createEffect(() =>
	// 		this.actions$.pipe(
	// 			ofType(PostActions.initPost),
	// 			switchMap(() => of(PostActions.loadPostSuccess({ post: [] }))),
	// 			catchError((error) => {
	// 				console.error('Error', error);
	// 				return of(PostActions.loadPostFailure({ error }));
	// 			})
	// 		)
	// 	);
}
