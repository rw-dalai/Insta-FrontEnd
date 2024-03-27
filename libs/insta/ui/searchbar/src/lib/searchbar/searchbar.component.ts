import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SearchbarType } from '../model/searchbar-type.model';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
	selector: 'ui-searchbar',
	standalone: true,
	imports: [
		CommonModule,
		MatInputModule,
		MatIconModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatTooltipModule,
	],
	templateUrl: './searchbar.component.html',
	styleUrls: ['./searchbar.component.scss'],
	host: {
		'[class.searchbar--flat]': 'type === SearchbarType.Flat',
		'[class.searchbar--raised]': 'type === SearchbarType.Raised',
	},
})
export class SearchbarComponent {
	// We need to have this attribute here so the host binding can access it
	SearchbarType = SearchbarType;

	// The default searchbar type is flat
	@Input() type = SearchbarType.Flat;

	// The reactive search input control
	@Input() searchControl!: FormControl;

	// Emits an event when the advanced search button is clicked
	@Output() searchClick = new EventEmitter<void>();

	onAdvancedSearchClick() {
		this.searchClick.emit();
	}
}
