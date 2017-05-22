import { Component, OnInit, ViewEncapsulation, HostListener, Inject, ViewChild, ElementRef } from '@angular/core';
import { AppState } from './app.service';
import { DataService } from './providers/data.service';
import { Subscription }   from 'rxjs/Subscription';
import { AuthHttp } from 'angular2-jwt';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './app.component.css' ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  @ViewChild('navbarToggler') navbarToggler:ElementRef;

  public loggedin;
  public subscription: Subscription;
  public navIsFixed;

  constructor(@Inject(DOCUMENT) public document: Document, public authHttp: AuthHttp, public appState: AppState, public dataService: DataService) {
    this.subscription = dataService.loginAnnounced$.subscribe(status => {
      this.loggedin = status;
    });
  }

  ngOnInit() {
    let token = localStorage.getItem('token');
    if(token){
      this.authHttp.post(this.dataService.urlSession, JSON.stringify({"token": token}))
        .subscribe(data => {
          let res = data.json();
          if(res.status){
            this.loggedin = true;
            this.dataService.loginState(true);
          }else{
            this.loggedin = false;
            this.dataService.loginState(false);
            localStorage.removeItem('token');
          }
        });
    }else{
      this.loggedin = false;
      this.dataService.loginState(false);
    }
  }

  public logout() {
    localStorage.removeItem('token');
    this.dataService.loginState(false);
  }

  public collapseNav() {
    // console.log(this.navbarToggler.nativeElement.offsetParent);
    if (this.navbarToggler.nativeElement.offsetParent !== null) {
      this.navbarToggler.nativeElement.click();
    }
  }

  @HostListener("window:scroll", [])
    onWindowScroll() {
      let number = this.document.body.scrollTop;
      if (number > 200) {
        this.navIsFixed = true;
      } else if (this.navIsFixed && number < 10) {
        this.navIsFixed = false;
      }
  }
}
