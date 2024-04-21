import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SidebarNavigationItem } from '../model/sidebar-navigation.model';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
	selector: 'ui-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
	standalone: true,
	imports: [
		MatSidenavModule,
		NgClass,
		MatListModule,
		MatIconModule,
		RouterLinkActive,
		NgForOf,
		RouterLink,
		NgIf,
		RouterOutlet,
	],
})
export class SidebarComponent implements OnInit {
	// Determine if the `sidenav` should be expanded or not
	isExpanded = false;

	// The navigation items to be displayed in the `sidenav`
	@Input() navigationItems: SidebarNavigationItem[] = [];

	// The `sidenav` component is used to toggle the `sidenav` mode
	@ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;

	constructor(private breakpointObserver: BreakpointObserver) {}

	ngOnInit() {
		// Observe the screen size to determine if the `sidenav` should be expanded or not
		this.breakpointObserver.observe(['(max-width: 599px)']).subscribe((result) => {
			// MOBILE
			if (result.matches) {
				this.sidenav.mode = 'over';
				this.sidenav.close();
				// DESKTOP
			} else {
				this.sidenav.mode = 'side';
				this.sidenav.open();
			}
		});
	}

	// Toggle this `sidenav`
	onToggle() {
		if (this.sidenav.mode === 'side') {
			this.isExpanded = !this.isExpanded;
			// Ugly hack to update the sidenav content rendering
			setTimeout(() => (this.sidenav.mode = 'side'));
		} else {
			this.isExpanded = true;
			this.sidenav.toggle();
		}
	}
}
