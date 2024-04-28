export interface Post {
	id: string;
	creatorId: string;
	text: string;
	thumb: Media;
	// hashTags: { value: string }[];
	hashTags: HashTag[];
	likes: number;
}

export interface HashTag {
	value: string;
}

// new Date(1713085188000) -> "Sun Apr 14 2024 10:59:48 GMT+0200 (Central European Summer Time)"
export interface Media {
	id: string; // dog.jpg
	createdAt: number; // Backend sends: epoch millis
	filename: string;
	mimeType: string; // e.g. image/jpeg, image/png, video/mp4
	size: number;
	width: number;
	height: number;
}
