import { Component } from '@angular/core';
import { SidebarComponent } from '@insta/ui/sidebar';
import { ToolbarComponent } from '@insta/ui/toolbar';
import { navigationItems } from './lib.routes';

@Component({
	selector: 'insta-main-shell',
	standalone: true,
	template: `
		<ui-sidebar #sidebar [navigationItems]="navigationItems">
			<ui-toolbar (toggle)="sidebar.onToggle()"></ui-toolbar>
		</ui-sidebar>
	`,
	styles: [],
	imports: [SidebarComponent, ToolbarComponent],
})
export class MainShellComponent {
	protected readonly navigationItems = navigationItems;
}
