import { Component, OnInit } from '@angular/core';
import { DataService } from '../providers/data.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'about',
  templateUrl: 'about.component.html' 
})

export class AboutComponent {

  constructor(public title: Title, 
              public dataService: DataService)
  {}

  ngOnInit() {
    window.scrollTo(0,0);
    this.title.setTitle('About | '+this.dataService.baseTitle);
  }

}
