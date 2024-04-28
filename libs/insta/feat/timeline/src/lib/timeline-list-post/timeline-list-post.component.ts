import { Component, Input } from '@angular/core';
import { Post } from '@insta/data/post';
import { TimelineOverviewPostComponent } from '../timeline-overview-post/timeline-overview-post.component';

@Component({
	selector: 'insta-timeline-list-post',
	standalone: true,
	imports: [TimelineOverviewPostComponent],
	templateUrl: './timeline-list-post.component.html',
	styleUrl: './timeline-list-post.component.css',
})
export class TimelineListPostComponent {
	@Input() posts!: Post[];
}
