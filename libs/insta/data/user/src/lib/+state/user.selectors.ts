import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USER_FEATURE_KEY, UserState, userAdapter } from './user.reducer';

// Lookup the 'User' feature state managed by NgRx
export const selectUserState = createFeatureSelector<UserState>(USER_FEATURE_KEY);

const { selectAll, selectEntities } = userAdapter.getSelectors();

export const selectUserLoaded = createSelector(selectUserState, (state: UserState) => state.loaded);

export const selectUserError = createSelector(selectUserState, (state: UserState) => state.error);

export const selectAllUser = createSelector(selectUserState, (state: UserState) =>
	selectAll(state)
);

export const selectUserEntities = createSelector(selectUserState, (state: UserState) =>
	selectEntities(state)
);

export const selectSelectedId = createSelector(
	selectUserState,
	(state: UserState) => state.selectedId
);

export const selectEntity = createSelector(
	selectUserEntities,
	selectSelectedId,
	(entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
