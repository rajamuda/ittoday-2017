import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from '../providers/data.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'home',
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public event_desc: any = {};
  public schedule: any = {};
  public checker = false;

  constructor(public title: Title, 
              public http: Http,
              public dataService: DataService)
  {
    this.dataService.getData()
      .subscribe(data => {
        this.event_desc = data.event_desc;
        this.schedule = data.event_date;
        this.checker = true;
      }, err => {
        console.log(err);
      });
  }

  ngOnInit() {
     window.scrollTo(0,0);
     this.title.setTitle(this.dataService.baseTitle);
  }
}
