import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';


@Injectable()
export class UploadService {
  progressObserver = new Subject<number>();
  progress$ = this.progressObserver.asObservable();
  progress: number = 0;
  filesToUpload: Array<File>;

  makeFileRequest(url: string, params: any, files: Array<File>) {
    /*
      params = {
        authorization: TOKEN_HERE,
        name: FORM INPUT FILE NAMES
      }
  
    */

    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();

      for(var i = 0; i < files.length; i++) {
        formData.append(params.name ,files[i],files[i].name);
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }

      setInterval(() => {}, 500);

      xhr.upload.onprogress = (event) => {
        this.progress = Math.round(event.loaded / event.total * 100);
        this.progressObserver.next(this.progress);
      };

      xhr.open("POST", url, true);

      xhr.setRequestHeader('Authorization', params.authorization);
      if(params.team){
        xhr.setRequestHeader('Team', params.team);
      }
      xhr.send(formData);
    });
  }
}
