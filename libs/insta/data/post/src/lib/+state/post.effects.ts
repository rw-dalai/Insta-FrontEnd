// import { Injectable, inject } from '@angular/core';
// import { createEffect, Actions, ofType } from '@ngrx/effects';
// import { switchMap, catchError, of } from 'rxjs';
// import * as PostActions from './post.actions';
// import * as PostFeature from './post.reducer';
//
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap, tap } from 'rxjs';
import * as PostActions from './post.actions';
import { SendMessageCommand, SendMessageResponse } from './post.actions';
import { PostHttpService } from '../service/post-http.service';
import { TypedAction } from '@ngrx/store/src/models';

@Injectable()
export class PostEffects {
	private actions$ = inject(Actions);

	private httpService = inject(PostHttpService);

	sendMessage$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PostActions.sendMessage),
			// TODO exludes the type of ngrx action
			// '[Post/API] Send Message', // type
			switchMap((command: SendMessageCommand) =>
				this.httpService.sendMessage(command).pipe(
					switchMap((response: SendMessageResponse) => of(PostActions.sendMessageSuccess())),
					catchError((error) => of(PostActions.sendMessageFailure({ error })))
				)
			)
		)
	);
}
