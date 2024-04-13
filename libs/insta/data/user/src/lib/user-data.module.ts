import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUser from './+state/user.reducer';
import { UserEffects } from './+state/user.effects';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		StoreModule.forFeature(fromUser.USER_FEATURE_KEY, fromUser.userReducer),
		EffectsModule.forFeature([UserEffects]),
	],
})
export class UserDataModule {}
