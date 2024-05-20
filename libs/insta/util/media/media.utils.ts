// TODO post.domain model has a media interface, we got code duplication here!
export interface MediaMeta {
	// File
	filename: string;
	mimeType: string; // e.g. image/jpeg, image/png, video/mp4
	size: number;

	// Calculate with Image object
	width: number;
	height: number;

	// Geolocation API
	// longitude: number;
	// latitude:number;
}

// process
// main-thread browser-thread
// race condition
export function createMediasMeta(medias: File[]): Promise<MediaMeta[]> {
	// return Promise.all(medias.map(async (media) => {
	return Promise.all(
		medias.map(async (media) => {
			const dimensions = await getImageDimensions(media);
			return {
				filename: media.name,
				mimeType: media.type,
				size: media.size,
				width: dimensions.width,
				height: dimensions.height,
			};
		})
	);
}

export function getImageDimensions(file: File) {
	return new Promise<{ width: number; height: number }>(function (resolve, reject) {
		// Creates an HTMLImageElement in Memory, we do not attach this element to the DOM Tree.
		const image = new Image();
		image.src = URL.createObjectURL(file);
		// image.width // 0
		// image.height // 0
		// Called by the browser after all our functions are finished
		image.onload = function () {
			resolve({ width: image.width, height: image.height });
			URL.revokeObjectURL(image.src);
			// reject(new Error("could not determine image dimenions"));
		};
	});
}

/*
export function getImageDimensions(file: File): Promise<{ width: number, height: number}> {
  // <img src="" width=.. height=...>

  const promise = new Promise<{ width: number, height: number}>(function(resolve, reject) {

    setTimeout(function() {
      resolve({ width: 500, height: 100 })
    }, 5000)

  })

  return promise;
}
 */

/*
function callsX() {
  const mappedArray = [1, 2, 3].map(number => x(number));
}

function x(num: number): number {
  return num * 2;
}

function callY() {
  const mappedPromiseArray = [1, 2, 3].map(number => y(number));
  Promise.all(mappedPromiseArray).then((mappedArray) => {
    // TODO
  });
}


function y(num: number): Promise<number> {
  return Promise.resolve(num * 2);
}


 */
