import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FormControl } from '@angular/forms';
import { SearchbarComponent, SearchbarType } from '@insta/ui/searchbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

@Component({
	selector: 'ui-toolbar',
	standalone: true,
	imports: [
		CommonModule,
		SearchbarComponent,
		MatIconModule,
		MatButtonModule,
		MatTooltipModule,
		MatToolbarModule,
		MatMenuModule,
	],
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
	// The searchbar type needed as an enum for property binding
	SearchbarType = SearchbarType;

	// Determine if the `toolbar` should be expanded or not
	isExpanded = false;

	// The reactive search input control
	searchCtrl = new FormControl();

	// Emits an event when the `toolbar` is toggled
	@Output() toggle = new EventEmitter<void>();

	// Emits an event when the search input changes
	@Output() searchValues = new EventEmitter<string>();

	// Emits an event when the advanced search button is clicked
	@Output() searchClick = new EventEmitter<void>();

	constructor(private breakpointObserver: BreakpointObserver) {}

	ngOnInit() {
		// Observe the screen size to determine if the `toolbar` should be expanded or not
		this.breakpointObserver.observe(['(max-width:599px)']).subscribe((result) => {
			if (result.matches) {
				this.isExpanded = false;
			} else {
				this.isExpanded = true;
			}
		});

		// Subscribe to the search input changes and emit the search event
		this.searchCtrl.valueChanges.subscribe(this.searchValues);
		// this.searchCtrl.valueChanges.subscribe(value => this.searchValues.emit(value));
	}

	onToggle() {
		this.toggle.emit();
	}

	onSearchClick() {
		this.searchClick.emit();
	}
}
