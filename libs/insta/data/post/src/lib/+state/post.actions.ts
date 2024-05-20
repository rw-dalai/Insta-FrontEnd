import { createAction, props } from '@ngrx/store';
import { MediaMeta } from '../../../../../util/media/media.utils';
// import { PostEntity } from './post.models';
//
// export const initPost = createAction('[Post Page] Init');
//
// export const loadPostSuccess = createAction(
// 	'[Post/API] Load Post Success',
// 	props<{ post: PostEntity[] }>()
// );
//
// export const loadPostFailure = createAction(
// 	'[Post/API] Load Post Failure',
// 	props<{ error: any }>()
// );

// --------- Send Message Action ---------

// data which goes to the server
export interface SendMessageCommand {
	message: string;
	mediasMeta: MediaMeta[];
	medias: File[];
}

// data which comes back from the server
export interface SendMessageResponse {
	// TODO
}

export const sendMessage = createAction(
	'[Post/API] Send Message', // type
	props<SendMessageCommand>() // data of the action
);

export const sendMessageSuccess = createAction(
	'[Post/API] Send Message Success' // type
	// TODO
);

export const sendMessageFailure = createAction(
	'[Post/API] Send Message Failure', // type
	props<{ error: string }>()
);
