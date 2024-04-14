import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

// import * as PostActions from './post.actions';
import { Post } from './post-domain.model';
import { Dictionary, EntityMap, EntityMapOne, Predicate, Update } from '@ngrx/entity/src/models';
import * as UserActions from '../../../../user/src/lib/+state/user.actions';
import { UserLoginResponse } from '../../../../user/src/lib/+state/user.actions';

// Entity Store

// addOne<S extends EntityState<T>>(entity: T, state: S): S;
// addMany<S extends EntityState<T>>(entities: T[], state: S): S;
// setAll<S extends EntityState<T>>(entities: T[], state: S): S;
// setOne<S extends EntityState<T>>(entity: T, state: S): S;
// setMany<S extends EntityState<T>>(entities: T[], state: S): S;
// removeOne<S extends EntityState<T>>(key: string, state: S): S;
// removeOne<S extends EntityState<T>>(key: number, state: S): S;
// removeMany<S extends EntityState<T>>(keys: string[], state: S): S;
// removeMany<S extends EntityState<T>>(keys: number[], state: S): S;
// removeMany<S extends EntityState<T>>(predicate: Predicate<T>, state: S): S;
// removeAll<S extends EntityState<T>>(state: S): S;
// updateOne<S extends EntityState<T>>(update: Update<T>, state: S): S;
// updateMany<S extends EntityState<T>>(updates: Update<T>[], state: S): S;
// upsertOne<S extends EntityState<T>>(entity: T, state: S): S;
// upsertMany<S extends EntityState<T>>(entities: T[], state: S): S;
// mapOne<S extends EntityState<T>>(map: EntityMapOne<T>, state: S): S;
// map<S extends EntityState<T>>(map: EntityMap<T>, state: S): S;

export const POST_FEATURE_KEY = 'post';

// export interface PostState {
export interface PostState extends EntityState<Post> {
	selectedId: string | null;
	loaded: boolean;
	error: string | null;
}

// export interface PostPartialState {
// 	readonly [POST_FEATURE_KEY]: PostState;
// }

export const postAdapter: EntityAdapter<Post> = createEntityAdapter<Post>();

export const initialPostState: PostState = postAdapter.getInitialState({
	selectedId: null,
	loaded: false,
	error: null,
});

const reducer = createReducer(
	initialPostState,

	on(UserActions.loginUserSuccess, (state, response: UserLoginResponse) => {
		// let newState = { ...state, loaded: true };
		// newState = postAdapter.setAll(response.posts, newState);
		// return newState;
		return postAdapter.setAll(response.posts, { ...state, loaded: true, error: null });
	})

	// on(PostActions.loadPostFailure, (state, { error }) => ({ ...state, error }))
);

export function postReducer(state: PostState | undefined, action: Action) {
	return reducer(state, action);
}
