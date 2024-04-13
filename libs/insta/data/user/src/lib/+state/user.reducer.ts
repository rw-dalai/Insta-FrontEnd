// import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
// import { createReducer, on, Action } from '@ngrx/store';
//
// import * as UserActions from './user.actions';
// import { UserEntity } from './user.models';
//
// export const USER_FEATURE_KEY = 'user';
//
// export interface UserState extends EntityState<UserEntity> {
// 	selectedId?: string | number; // which User record has been selected
// 	loaded: boolean; // has the User list been loaded
// 	error?: string | null; // last known error (if any)
// }
//
// export interface UserPartialState {
// 	readonly [USER_FEATURE_KEY]: UserState;
// }
//
// export const userAdapter: EntityAdapter<UserEntity> = createEntityAdapter<UserEntity>();
//
// export const initialUserState: UserState = userAdapter.getInitialState({
// 	// set initial required properties
// 	loaded: false,
// });
//
// const reducer = createReducer(
// 	initialUserState,
// 	on(UserActions.initUser, (state) => ({ ...state, loaded: false, error: null })),
// 	on(UserActions.loadUserSuccess, (state, { user }) =>
// 		userAdapter.setAll(user, { ...state, loaded: true })
// 	),
// 	on(UserActions.loadUserFailure, (state, { error }) => ({ ...state, error }))
// );
//
// export function userReducer(state: UserState | undefined, action: Action) {
// 	return reducer(state, action);
// }

import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as UserActions from './user.actions';
import { User } from './user-domain.model';
import { UserLoginResponse } from './user.actions';

export const USER_FEATURE_KEY = 'user';

export interface UserState {
	user: User | null;
	error: string | null;
}

export const initialUserState: UserState = {
	user: null,
	error: null,
};

const reducer = createReducer(
	initialUserState,

	on(UserActions.loginUserSuccess, (state, response: UserLoginResponse) => ({
		...state,
		user: response.user,
		error: null,
	})),

	on(UserActions.loginUserFailure, (state, response: { error: string }) => ({
		...state,
		error: response.error,
	}))

	// TODO
);

export function userReducer(state: UserState | undefined, action: Action) {
	return reducer(state, action);
}
