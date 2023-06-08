import {
  HttpRequest,
  HttpClient,
  HttpEvent,
  HttpEventType,
} from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Observable, of } from "rxjs";
import {
  FilePickerAdapter,
  UploadResponse,
  UploadStatus,
  FilePreviewModel,
} from "ngx-awesome-uploader";
import { VariablesGlobales } from "./variablesGlobales";

export class PhotosPickerAdapter extends FilePickerAdapter {
  constructor(private http: HttpClient, private globals: VariablesGlobales) {
    super();
  }

  public uploadFile(fileItem: FilePreviewModel): Observable<UploadResponse> {
    const form = new FormData();
    form.append("file", fileItem.file);
    const api = "http://localhost:8090/api/uploadFile";
    const req = new HttpRequest("POST", api, form, { reportProgress: true });
    return this.http.request(req).pipe(
      map((res: HttpEvent<any>) => {
        if (res.type === HttpEventType.Response) {
          const responseFromBackend = res.body;
          return {
            body: responseFromBackend,
            status: UploadStatus.UPLOADED,
          };
        } else if (res.type === HttpEventType.UploadProgress) {

          const uploadProgress = +Math.round((100 * res.loaded) / res.total);
          return {
            status: UploadStatus.IN_PROGRESS,
            progress: uploadProgress,
          };
        }
      }),
      catchError((er) => {
        return of({ status: UploadStatus.ERROR, body: er });
      })
    );
  }
  public removeFile(fileItem: FilePreviewModel): Observable<any> {
    let responseFromBackend = fileItem.uploadResponse;
    let fileName = responseFromBackend.fileName;
    const removeApi = "http://localhost:8090/api/deleteFile";
    this.globals.photos.forEach((element, index) => {
      if (element == responseFromBackend.fileDownloadUri)
        this.globals.photos.splice(index, 1);
    });
    return this.http.delete(`${removeApi}/${fileName}`);
  }
}
