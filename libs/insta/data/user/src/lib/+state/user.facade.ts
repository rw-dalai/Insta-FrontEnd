import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as UserActions from './user.actions';
import * as UserFeature from './user.reducer';
import * as UserSelectors from './user.selectors';

@Injectable()
export class UserFacade {
	private readonly store = inject(Store);

	/**
	 * Combine pieces of state using createSelector,
	 * and expose them as observables through the facade.
	 */
	loaded$ = this.store.pipe(select(UserSelectors.selectUserLoaded));
	allUser$ = this.store.pipe(select(UserSelectors.selectAllUser));
	selectedUser$ = this.store.pipe(select(UserSelectors.selectEntity));

	/**
	 * Use the initialization action to perform one
	 * or more tasks in your Effects.
	 */
	init() {
		this.store.dispatch(UserActions.initUser());
	}
}
