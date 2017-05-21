import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Subject }    from 'rxjs/Subject';
import { ToastrService } from 'toastr-ng2';

@Component({
  selector: 'about',
  templateUrl: 'about.component.html' 
})

@Injectable()
export class AboutComponent {
  nama: string;
  nim: string;
  // progress: number = 0;
  progressObserver = new Subject<number>();
  progress$ = this.progressObserver.asObservable();
  progress: number = 0;
  filesToUpload: Array<File>;
  inUpload: boolean = false;

  constructor(toast: ToastrService) {
    this.filesToUpload = []; 
    
    this.progress$.subscribe(status => {
      this.progress = status;
      // console.log(this.progress)
    }) 
  }

  ngOnInit() {
   
  }

  upload() {
    this.inUpload = true;
    this.makeFileRequest("http://localhost:4200/api/user/uploadid", [], this.filesToUpload).then((result) => {
        console.log(result);
        // this.progress = 0;
    }, (error) => {
        console.error(error);
    });
    // this.progress = 0;
    // this.inUpload = false;
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>> fileInput.target.files;
    console.log(this.filesToUpload[0].type);
    // this.makeFileRequest("http://localhost:4200/api/user/uploadid", [], this.filesToUpload).then((result) => {
    //     console.log('ini hasil balikan',result);
    // }, (error) => {
    //     console.error(error);
    // });
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();

      for(var i = 0; i < files.length; i++) {
        formData.append("profilepic" ,files[i],files[i].name);
      }
      //append informasi lain peserta.
      formData.append("nama", this.nama);
      formData.append("nim", this.nim);
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }

      setInterval(() => {

      }, 500);

      xhr.upload.onprogress = (event) => {
        this.progress = Math.round(event.loaded / event.total * 100);
        this.progressObserver.next(this.progress);

        // this.progressObserver.next(this.progress);
      };
      console.log('ini yang dikirim ', this.filesToUpload);
      console.log('ini form data', formData.getAll('upload[]') );
      console.log('ini files.name', files[0].name);
      xhr.open("POST", url, true);

      xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      xhr.send(formData);
    });
  }
  // public localState: any;
  // constructor(public route: ActivatedRoute) {}

  // ngOnInit() {
  //   window.scrollTo(0,0);
  //   this.route
  //     .data
  //     .subscribe((data: any) => {
  //       // your resolved data from route
  //       this.localState = data.yourData;
  //     });

  //   console.log('hello `About` component');
  //   // static data that is bundled
  //   // var mockData = require('assets/mock-data/mock-data.json');
  //   // console.log('mockData', mockData);
  //   // if you're working with mock data you can also use http.get('assets/mock-data/mock-data.json')
  //   this.asyncDataWithWebpack();
  // }
  // private asyncDataWithWebpack() {
  //   // you can also async load mock data with 'es6-promise-loader'
  //   // you would do this if you don't want the mock-data bundled
  //   // remember that 'es6-promise-loader' is a promise
  //   setTimeout(() => {

  //     System.import('../../assets/mock-data/mock-data.json')
  //       .then((json) => {
  //         console.log('async mockData', json);
  //         this.localState = json;
  //       });

  //   });
  // }

}
