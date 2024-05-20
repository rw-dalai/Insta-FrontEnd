// type HttpFormBuilderFileType = File | File[];

// Builder Pattern
// Fluent API Pattern
export class HttpFormBuilder {
	private form: FormData;

	constructor() {
		this.form = new FormData();
	}

	addJson(key: string, data: object) {
		const jsonPart = new Blob([JSON.stringify(data)], { type: 'application/json' });

		this.form.append(key, jsonPart);
		return this;
	}

	addFiles(key: string, files: File | File[]) {
		if (!Array.isArray(files)) {
			files = [files];
		}

		for (const file of files) {
			this.form.append(key, file, file.name);
		}

		return this;
	}

	build() {
		return this.form;
	}
}
