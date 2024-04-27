import { createFeatureSelector, createSelector } from '@ngrx/store';
import { POST_FEATURE_KEY, PostState, postAdapter } from './post.reducer';

// PULL style API
//   Rest APIs, HTTP GET Request
//   Java Streams
//   JavaScript array methods

// PUSH style API
//  Push Notification
//  SSE
//  WebSockets
//  Redux Store -> Selectors

// Lookup the 'Post' feature state managed by NgRx
export const selectPostState = createFeatureSelector<PostState>(POST_FEATURE_KEY);

const { selectAll, selectEntities } = postAdapter.getSelectors();

export const selectPostLoaded = createSelector(selectPostState, (state: PostState) => state.loaded);

export const selectPostError = createSelector(selectPostState, (state: PostState) => state.error);

export const selectAllPost = createSelector(selectPostState, (state: PostState) =>
	selectAll(state)
);

export const selectPostEntities = createSelector(selectPostState, (state: PostState) =>
	selectEntities(state)
);

export const selectSelectedId = createSelector(
	selectPostState,
	(state: PostState) => state.selectedId
);

export const selectEntity = createSelector(
	selectPostEntities,
	selectSelectedId,
	(entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
