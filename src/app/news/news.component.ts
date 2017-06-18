import { Component } from '@angular/core';
import { DataService } from '../providers/data.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'news',
  styleUrls: [ './news.component.css' ],
  templateUrl: './news.component.html' 
})

export class NewsComponent {
  public articles: Array<Object> = [];
  public new: Array<Object> = [];
  public page = 1;
  public endOfPost = false;
  public isEnd = new Subject<boolean>();
  public endOfPostAnnounced$ = this.isEnd.asObservable();

  constructor(public title: Title, 
              public http: Http,
              public dataService: DataService,
              public route: Router)
  {
    this.getNewsData();
    this.endOfPostAnnounced$.subscribe(res => {
      this.endOfPost = res;
    })
  }

  ngOnInit() {
    window.scrollTo(0,0);
    this.title.setTitle('News | '+this.dataService.baseTitle);
  }

  getNewsData(){
    this.http.get(this.dataService.baseUrl+'/api/news?page='+this.page)
      .subscribe(res => {
        this.articles = res.json().data;
        console.log(this.articles);
      })
  }

  scrolled(){
    setTimeout(() => {
      if(!this.endOfPost){
        this.page = this.page+1;
        this.http.get(this.dataService.baseUrl+'/api/news?page='+this.page)
          .subscribe(res => {
            let content = res.json();
            if(content.data.length)
              this.articles = this.articles.concat(content.data);
            else
              this.isEnd.next(true);
          })
      }else{
        console.log("Habis gan");
      }
      },500)
  }

}
