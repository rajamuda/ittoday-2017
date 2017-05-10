import { Component, OnInit, ViewEncapsulation, HostListener, Inject } from '@angular/core';
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
  public loggedin;
  public subscription: Subscription;
  public navIsFixed;

  constructor(@Inject(DOCUMENT) private document: Document, public authHttp: AuthHttp, public appState: AppState, public dataService: DataService) {
    this.subscription = dataService.loginAnnounced$.subscribe(status => {
      this.loggedin = status;
    });
  }

  public ngOnInit() {
    let token = localStorage.getItem('token');
    if(token){
      this.authHttp.post('http://localhost:4200/session', JSON.stringify({"token": token}))
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

  @HostListener("window:scroll", [])
    onWindowScroll() {
      let number = this.document.body.scrollTop;
      if (number > 120) {
        this.navIsFixed = true;
      } else if (this.navIsFixed && number < 120) {
        this.navIsFixed = false;
      }
  }
}
