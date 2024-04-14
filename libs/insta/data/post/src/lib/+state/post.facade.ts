import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

// import * as PostActions from './post.actions';
import * as PostFeature from './post.reducer';
import * as PostSelectors from './post.selectors';

@Injectable()
export class PostFacade {
	private readonly store = inject(Store);
}
