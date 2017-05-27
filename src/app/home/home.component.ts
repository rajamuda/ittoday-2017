import { Component, OnInit } from '@angular/core';
import { DataService } from '../providers/data.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'home',
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  // Set our default values
  // public localState = { value: '' };
  // TypeScript public modifiers
  constructor(public title: Title, 
              public dataService: DataService)
  {}

  ngOnInit() {
     window.scrollTo(0,0);
     this.title.setTitle(this.dataService.baseTitle);
  }
}
