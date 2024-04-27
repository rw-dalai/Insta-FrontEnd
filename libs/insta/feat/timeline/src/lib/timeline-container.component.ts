import {
	Component,
	inject,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Post, selectAllPost } from '@insta/data/post';
import { delay, Observable, Subscription, tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// UI Designs
// https://www.adhamdannaway.com/blog/ui-design/16-ui-design-rules

// New Template Syntax
// https://dev.to/this-is-angular/angular-is-getting-new-template-syntax-4naf

// Memory Leak
// TODO

@Component({
	selector: 'insta-timeline-container',
	standalone: true,
	imports: [CommonModule, MatProgressSpinnerModule],
	template: `
		<!--  MANUAL SUBSCRIPTION    -->
		<!--    <div *ngFor="let post of posts">-->
		<!--        {{ post | json }}-->
		<!--        <br>-->
		<!--    </div>-->

		<!-- ASYNC PIPE w. old template syntax -->
		<ng-container *ngIf="posts$ | async as posts; else loading">
			<div *ngFor="let post of posts">
				{{ post | json }}
			</div>
		</ng-container>
		<ng-template #loading>
			<mat-spinner></mat-spinner>
		</ng-template>

		<!-- ASYNC PIPE w. new Angular v17 Syntax  -->
	`,
	styles: [],
})
export class TimelineContainerComponent implements OnChanges, OnInit, OnDestroy {
	// @Input()

	// posts: Post[] = [];
	// subscription!: Subscription;

	private store = inject(Store);
	posts$!: Observable<Post[]>;

	// 3.
	// ngOnInit(): void {
	//   this.subscription = this.store.select(selectAllPost).pipe(
	//     // logging
	//     tap((posts) =>
	//       console.log('TimelineContainerComponent#OnInit', posts))
	//     // next of the Observable
	//   ).subscribe((posts: Post[]) => {
	//     this.posts = posts;
	//   })
	//
	//   // this.store.dispatch()
	// }

	ngOnInit(): void {
		this.posts$ = this.store.select(selectAllPost).pipe(
			// delay(5000), // e.g. http request/response takes 5 seconds
			tap((posts) => console.log('TimelineContainerComponent#OnInit', posts))
		);
	}

	// 1.
	constructor() {
		console.log('TimelineContainerComponent#CTOR');
	}

	// 2.
	ngOnChanges(changes: SimpleChanges) {
		console.log('TimelineContainerComponent#CHANGES');
	}

	// last one
	ngOnDestroy() {
		// manually unsubscribe
		// this.subscription.unsubscribe();
	}
}
