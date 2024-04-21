import { Route } from '@angular/router';
import { MainShellComponent } from './main-shell.component';
import { TimelineContainerComponent } from '@insta/feat/timeline';
import { SidebarNavigationItem } from '@insta/ui/sidebar';

// /timeline

export const featureMainRoutes: Route[] = [
	{
		path: '',
		component: MainShellComponent,
		children: [
			{ path: 'timeline', component: TimelineContainerComponent },

			// { path: 'profile', component: ProfileContainerComponent },
			// { path: 'social', component: SocialContainer },

			{ path: '**', redirectTo: 'timeline' },
		],
	},
];

// The navigation items are passed to the `SidebarComponent` for navigation
export const navigationItems: SidebarNavigationItem[] = [
	{ route: 'timeline', name: 'Timeline', icon: 'feed' },
	// { route: 'profile', name: 'Profile', icon: 'sell' },
	// { route: 'social', name: 'Social', icon: 'sell' },
];
