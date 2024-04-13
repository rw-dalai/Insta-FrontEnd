import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as UserActions from './user.actions';
import * as UserFeature from './user.reducer';
import * as UserSelectors from './user.selectors';

@Injectable()
export class UserFacade {
	private readonly store = inject(Store);
}
