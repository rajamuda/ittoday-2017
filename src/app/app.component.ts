import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';
import { DataService } from './providers/data.service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './app.component.css' ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public loggedin;
  public subscription: Subscription;

  constructor(public appState: AppState, public dataService: DataService) {
    this.subscription = dataService.loginAnnounced$.subscribe(status => {
      this.loggedin = status;
    })
  }

  public ngOnInit() {
    // console.log('Initial App State', this.appState.state);
  }

  public logout() {
    localStorage.removeItem('token');
    this.dataService.loginState(false);
  }
}
