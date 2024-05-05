import { Pipe, PipeTransform } from '@angular/core';

const MB = 1024 * 1024;
const KB = 1014;

@Pipe({
	name: 'fileSize',
	standalone: true,
})
export class FileSizePipe implements PipeTransform {
	// 900 -> 0.9KB
	// 26_000 -> 26K
	// 2_600_000 -> 2.6MB
	transform(size: number): string {
		if (size > MB) {
			return `${(size / MB).toFixed(1)} MB`;
			// return (size / MB).toFixed(1)  + " MB";
		} else {
			return `${(size / KB).toFixed(1)} KB`;
		}
	}
}
