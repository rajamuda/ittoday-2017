import { Component } from '@angular/core';
import { DataService } from '../providers/data.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'news',
  styleUrls: [ './news.component.css' ],
  templateUrl: './news.component.html' 
})

export class NewsComponent {
  constructor(public title: Title, 
              public dataService: DataService,
              public route: Router)
  {}

  ngOnInit() {
    window.scrollTo(0,0);
    this.title.setTitle('News | '+this.dataService.baseTitle);
    this.route.navigate(['/']);
  }

}
