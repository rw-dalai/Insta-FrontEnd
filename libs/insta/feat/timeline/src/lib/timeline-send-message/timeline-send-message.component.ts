import { Component, inject } from '@angular/core';
import {
	FormArray,
	FormBuilder,
	FormControl,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { SafeUrlDirective } from '../safe-url.directive';
import { CustomValidators } from '@insta/util';
import { FileSizePipe } from '../file-size.pipe';
import { DatePipe, JsonPipe, LowerCasePipe, UpperCasePipe } from '@angular/common';

@Component({
	selector: 'insta-timeline-send-message',
	standalone: true,
	imports: [
		SafeUrlDirective,
		ReactiveFormsModule,
		FileSizePipe,
		UpperCasePipe,
		JsonPipe,
		LowerCasePipe,
		DatePipe,
	],
	templateUrl: './timeline-send-message.component.html',
	styleUrl: './timeline-send-message.component.css',
})
export class TimelineSendMessageComponent {
	MAX_FILE_SIZE = 5 * 1024 * 1024;

	fb = inject(FormBuilder);

	sendMessageForm = this.fb.nonNullable.group({
		message: ['default message', Validators.required],
		files: new FormArray<FormControl<File>>([], [Validators.maxLength(10)]),
	});

	get filesCtrl() {
		// return this.sendMessageForm.get('files') as FormArray<FormControl<File>>
		return this.sendMessageForm.controls.files;
	}

	// Called whenever the user chooses new files
	onFileChange(event: Event) {
		// We push them into the files form array
		this.pushFiles(this.getFiles(event));

		// Clear the value of the file input to allow re-selection of the same file(s).
		// Otherwise the `change` event is not fired, if we re-select the same file(s).
		(event.target as HTMLInputElement).value = '';
	}

	// Extracts the files
	private getFiles(event: Event): File[] {
		const files = (event.target as HTMLInputElement).files!;
		return Array.from(files);
	}

	// Pushes the files as FormControl into the Form Array
	private pushFiles(files: File[]) {
		files.forEach((file: File) => {
			// const fileCtrl = new FormControl<File>(file, { nonNullable: true });
			const fileCtrl = this.fb.nonNullable.control<File>(
				file,
				CustomValidators.maxSize(this.MAX_FILE_SIZE)
			);
			this.filesCtrl.push(fileCtrl);
		});
	}

	// Removes a file from the Form Array
	onFileDelete(index: number) {
		this.filesCtrl.removeAt(index);
	}

	// When the user presses the send button
	onSendMessage() {
		console.log('SendMessage', this.sendMessageForm.value);
	}
}
