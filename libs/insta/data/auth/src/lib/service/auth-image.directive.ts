import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
// A Blob URL is a URL that references a file (blob) that is stored in the browser's memory.
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

@Directive({
	selector: '[authImage]',
	standalone: true,
})
export class AuthImageDirective implements OnInit {
	@Input('authImage') imageUrl!: string;

	constructor(private element: ElementRef<HTMLImageElement>, private http: HttpClient) {}

	ngOnInit() {
		this.http
			.get(this.imageUrl, { responseType: 'blob' })
			.subscribe((imageBlob) => (this.element.nativeElement.src = URL.createObjectURL(imageBlob)));
	}
}
