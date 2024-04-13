// import { createAction, props } from '@ngrx/store';
// import { UserEntity } from './user.models';
//
// export const initUser = createAction('[User Page] Init');
//
// export const loadUserSuccess = createAction(
// 	'[User/API] Load User Success',
// 	props<{ user: UserEntity[] }>()
// );
//
// export const loadUserFailure = createAction(
// 	'[User/API] Load User Failure',
// 	props<{ error: any }>()
// );

import { createAction, props } from '@ngrx/store';
import { User } from './user-domain.model';

export interface UserRegistrationCommand {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}

// --------- User Login Action ---------

export interface UserLoginCommand {
	email: string;
	password: string;
}

export interface UserLoginResponse {
	user: User;
	// posts: Post[];
}

export const loginUser = createAction(
	'[User/API] Login User', // type
	props<UserLoginCommand>() // data of the action
);

export const loginUserSuccess = createAction(
	'[User/API] Login User Success',
	props<UserLoginResponse>()
);

export const loginUserFailure = createAction('[User/API] Login User', props<{ error: string }>());
