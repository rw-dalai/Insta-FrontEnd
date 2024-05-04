import {
	Directive,
	ElementRef,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	SimpleChanges,
} from '@angular/core';

// TYPES OF IMAGE URLS

// 1. URL to an Image File
// ----------------------------------------------------------------------------
// - Can be a URL to an image file
//   e.g. https://...
// <img src="https://example.com/image.png">

// - Can be a file path to an image file
//   e.g. assets/...
// <img src="assets/image.png">

// 2. Base64 Encoded Data URI
// ----------------------------------------------------------------------------
// Base64 Encoded Data URI is a string that contains the image data in Base64 format.
// It is useful for small images that are embedded directly into the HTML.
// It is not recommended for large images because it increases the size of the HTML file by 33%.

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs
// data:[<mediatype>][;base64],<data>
// "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA........CYII="

// 3. Blob URL
// ----------------------------------------------------------------------------
// A Blob URL is a URL that references a file (blob) that is stored in the browser's memory or on disk.
// Its is created dynamically using the URL.createObjectURL(..) method.
// It is useful for images that are created dynamically in the browser.
// Using one of those API's: Canvas, WebRTC, File API, etc.

// const blob = new Blob([binaryData], {type: 'image/jpeg'});
// const url = URL.createObjectURL(blob);
// document.querySelector('img').src = url;

// In our directive we fetch an image bytes from the server, get a Blob and create a Blob URL.
// This is possible because the server sends:
//  - Content-Type: image/jpeg
//  - Response Body: binary data

// What is a Directive?
// ----------------------------------------------------------------------------
// A directive is a class with a @Directive decorator.
// It is used to add behavior to an existing element in the DOM.

// What is ElementRef?
// ----------------------------------------------------------------------------
// ElementRef is a class that wraps a native element in the DOM.

// file: File
// This image
// <img [safeUrl]="file">

@Directive({
	selector: '[safeUrl]',
	standalone: true,
})
export class SafeUrlDirective implements OnChanges, OnInit, OnDestroy {
	@Input('safeUrl') file!: File;

	url!: string;

	// 1.
	constructor(private element: ElementRef<HTMLImageElement>) {}

	// 2. Called whenever the input props are changing
	ngOnChanges(): void {
		console.log('SafeUrlDirective#onChanges', this.file);
		this.url = URL.createObjectURL(this.file);
		this.element.nativeElement.src = this.url;
	}

	// 3.Called after the first OnChanges
	ngOnInit(): void {}

	// 4. Called whenever Angular destroys the component in the DOM, e.g. we route away
	ngOnDestroy(): void {
		URL.revokeObjectURL(this.url);
	}
}
