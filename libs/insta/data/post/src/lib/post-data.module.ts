import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromPost from './+state/post.reducer';
import { PostEffects } from './+state/post.effects';
import { PostFacade } from './+state/post.facade';

@NgModule({
	imports: [
		CommonModule,

		StoreModule.forFeature(fromPost.POST_FEATURE_KEY, fromPost.postReducer),
		EffectsModule.forFeature([PostEffects]),
	],
	providers: [PostFacade],
})
export class PostDataModule {}
