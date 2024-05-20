import { Component, inject, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Post, selectAllPost, SendMessageCommand } from '@insta/data/post';
import { Observable, tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TimelineListPostComponent } from './timeline-list-post/timeline-list-post.component';
import { TimelineSendMessageComponent } from './timeline-send-message/timeline-send-message.component';
import { SendMessageFormData } from './model/send-message-view.model';
import { createMediasMeta, MediaMeta } from '../../../../util/media/media.utils';
import * as PostActions from '@insta/data/post';

@Component({
	selector: 'insta-timeline-container',
	standalone: true,
	imports: [
		CommonModule,
		MatProgressSpinnerModule,
		TimelineListPostComponent,
		TimelineSendMessageComponent,
	],
	template: `
		<!-- ASYNC PIPE w. new Angular v17 Syntax  -->
		@if (posts$ | async; as posts) {

		<!-- TIMELINE -->
		<insta-timeline-list-post [posts]="posts"> </insta-timeline-list-post>

		} @else {
		<mat-spinner></mat-spinner>
		}

		<!-- SEND MESSAGE -->
		<insta-timeline-send-message (sendMessage)="onSendMessage($event)">
		</insta-timeline-send-message>
	`,
	styles: [],
})
export class TimelineContainerComponent implements OnInit {
	private store = inject(Store);
	posts$!: Observable<Post[]>;

	ngOnInit(): void {
		this.posts$ = this.store.select(selectAllPost).pipe(
			// delay(5000), // e.g. http request/response takes 5 seconds
			tap((posts) => console.log('TimelineContainerComponent#OnInit', posts))
		);
	}

	async onSendMessage(formData: SendMessageFormData) {
		const message = formData.message;
		const medias = formData.medias;
		const mediasMeta = await createMediasMeta(formData.medias);

		const sendMessageCommand: SendMessageCommand = {
			message,
			medias,
			mediasMeta,
		};

		// we dispatch an action
		this.store.dispatch(PostActions.sendMessage(sendMessageCommand));
	}
}

// import { Component, inject, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Store } from '@ngrx/store';
// import { Post, selectAllPost } from '@insta/data/post';
// import { Observable, tap } from 'rxjs';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { TimelineListPostComponent } from './timeline-list-post/timeline-list-post.component';
// import { TimelineSendMessageComponent } from './timeline-send-message/timeline-send-message.component';
// import { SendMessageFormData } from './model/send-message-view.model';
// import { createMediasMeta } from '../../../../util/media/media.utils';
//
// // - UI Designs
// // https://www.adhamdannaway.com/blog/ui-design/16-ui-design-rules
//
// // - New Template Syntax
// // https://dev.to/this-is-angular/angular-is-getting-new-template-syntax-4naf
//
// // - Memory Leak
// // A memory leak is a type of resource leak that occurs when a computer program incorrectly
// // manages memory allocations in such a way that memory which is no longer needed is not released.
// //
// // A memory leak may also happen when an object is stored in memory
// // but cannot be accessed by the running code.
//
// @Component({
//   selector: 'insta-timeline-container',
//   standalone: true,
//   imports: [
//     CommonModule,
//     MatProgressSpinnerModule,
//     TimelineListPostComponent,
//     TimelineSendMessageComponent,
//   ],
//   template: `
// 		<!--  MANUAL SUBSCRIPTION    -->
// 		<!--    <div *ngFor="let post of posts">-->
// 		<!--        {{ post | json }}-->
// 		<!--        <br>-->
// 		<!--    </div>-->
//
// 		<!-- ASYNC PIPE w. old template syntax -->
// 		<!--		<ng-container *ngIf="posts$ | async as posts; else loading">-->
// 		<!--			<div *ngFor="let post of posts">-->
// 		<!--				{{ post | json }}-->
// 		<!--			</div>-->
// 		<!--		</ng-container>-->
// 		<!--		<ng-template #loading>-->
// 		<!--			<mat-spinner></mat-spinner>-->
// 		<!--		</ng-template>-->
//
// 		<!-- ASYNC PIPE w. new Angular v17 Syntax  -->
// 		@if (posts$ | async; as posts) {
//
//       <!-- TIMELINE -->
//       <insta-timeline-list-post [posts]="posts">
//       </insta-timeline-list-post>
//
// 		} @else {
// 		  <mat-spinner></mat-spinner>
// 		}
//
//     <!-- SEND MESSAGE -->
//     <insta-timeline-send-message
//         (sendMessage)="onSendMessage($event)">
//     </insta-timeline-send-message>
// 	`,
//   styles: [],
// })
// export class TimelineContainerComponent implements OnChanges, OnInit, OnDestroy {
//   // @Input()
//   // posts: Post[] = [];
//   // subscription!: Subscription;
//
//   private store = inject(Store);
//   posts$!: Observable<Post[]>;
//
//   // DO NOT USE MANUALLY SUBSCRIPTION TO AVOID MEMORY LEAKS, USE THE ASYNC PIPE !
//   //
//   // ngOnInit(): void {
//   //   this.subscription = this.store.select(selectAllPost).pipe(
//   //     // logging
//   //     tap((posts) =>
//   //       console.log('TimelineContainerComponent#OnInit', posts))
//   //     // next of the Observable
//   //   ).subscribe((posts: Post[]) => {
//   //     this.posts = posts;
//   //   })
//   //
//   //   // this.store.dispatch()
//   // }
//
//   // 1.
//   constructor() {
//     console.log('TimelineContainerComponent#CTOR');
//   }
//
//   // 2.
//   ngOnChanges(changes: SimpleChanges) {
//     console.log('TimelineContainerComponent#CHANGES');
//   }
//
//   // 3.
//   ngOnInit(): void {
//     this.posts$ = this.store.select(selectAllPost).pipe(
//       // delay(5000), // e.g. http request/response takes 5 seconds
//       tap((posts) => console.log('TimelineContainerComponent#OnInit', posts))
//     );
//   }
//
//   // last one
//   ngOnDestroy() {
//     // manually unsubscribe
//     // this.subscription.unsubscribe();
//   }
//
//   onSendMessage(formData: SendMessageFormData) {
//
//     // const mediasMeta = createMediasMeta(formData.medias[0]);
//     createMediasMeta(formData.medias[0]);
//
//
//   }
// }
