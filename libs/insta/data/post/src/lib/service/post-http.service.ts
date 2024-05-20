import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SendMessageCommand, SendMessageResponse } from '@insta/data/post';
import { Observable } from 'rxjs';
import { MediaMeta } from '../../../../../util/media/media.utils';
import { SendMessageFormData } from '../../../../../feat/timeline/src/lib/model/send-message-view.model';
import { HttpFormBuilder } from '../../../../../util/http/http-form-builder';
import { TypedAction } from '@ngrx/store/src/models';

// data which goes to the server
export interface UploadAvatarCommand {
	avatarMeta: MediaMeta;
	avatar: File;
}

@Injectable({ providedIn: 'root' })
export class PostHttpService {
	private http = inject(HttpClient);

	// readable, re-usable, test-able, SOLID
	// sendMessage(command: SendMessageCommand & TypedAction<string>): Observable<SendMessageResponse> {
	sendMessage(command: SendMessageCommand): Observable<SendMessageResponse> {
		const { medias, ...serverCommand } = command;

		return this.http.post<SendMessageResponse>(
			'/api/post',
			new HttpFormBuilder().addJson('command', serverCommand).addFiles('medias', medias).build()
		);
	}

	// // readable, re-usable, test-able, SOLID
	uploadAvatar(command: UploadAvatarCommand): Observable<SendMessageResponse> {
		const { avatar, ...serverCommand } = command;

		return this.http.post<SendMessageResponse>(
			'/api/user/avatar',
			new HttpFormBuilder().addJson('command', serverCommand).addFiles('avatar', avatar).build()
		);
	}

	// sendMessage(command: SendMessageCommand): Observable<SendMessageResponse> {
	//   const formData = new FormData();
	//
	//   //-----------------------------408279872436047533982722535190
	//   //Content-Disposition: form-data; name="message"; filename="blob"
	//   //Content-Type: application/json
	//   //{"message": "default message"}
	//
	//   // application/json part
	//   const messagePart = new Blob(
	//     [`{"message": "${ command.message }"}`],
	//     { type: 'application/json' },
	//   );
	//
	//   // formData.append("message", `{"message": "${command.message}"}`);
	//   formData.append('message', messagePart);
	//
	//   // application/json parts
	//   command.mediasMeta.forEach((mediaMeta) => {
	//     const mediasMetaPart = new Blob(
	//       [`${ JSON.stringify(mediaMeta) }`],
	//       { type: 'application/json' });
	//
	//     formData.append('mediasMeta', mediasMetaPart);
	//   });
	//
	//   // image/xxx parts
	//   // application/octet-stream
	//   command.medias.forEach((media: File) => {
	//     formData.append('medias', media);
	//   });
	//
	//
	//   return this.http.post<SendMessageResponse>('/api/post', formData);
	//
	//   // return this.http.post<SendMessageResponse>('/api/post',
	//   //   new HttpFormBuilder()
	//   //     .addJson('command', command.message)
	//   //     .addJson('mediasMeta', command.mediasMeta)
	//   //     .addFiles('medias', command.medias)
	//   //     .build()
	//   // );
	// }
}
