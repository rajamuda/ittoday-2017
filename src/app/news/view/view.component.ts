import { Component } from '@angular/core';
import { DataService } from '../../providers/data.service';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'view',
  styleUrls: [ './view.component.css' ],
  templateUrl: './view.component.html' 
})

export class ViewComponent {
  public article: any = {
    title: '',
    content: '',
    publish: '',
    modified: ''
  };

  public id;

  constructor(public title: Title, 
              public http: Http,
              public dataService: DataService,
              public activeRoute: ActivatedRoute,
              public route: Router)
  {
    this.activeRoute.params.subscribe((params)=>{
      this.id = params.id;
    })
    this.getNewsData();
  }

  ngOnInit() {
    window.scrollTo(0,0);
    this.title.setTitle('News | ' +this.dataService.baseTitle);
  }

  getNewsData(){
    this.http.get(this.dataService.baseUrl+'/api/news/'+this.id)
      .subscribe(res => {
        let result = res.json();
        this.article.title = result.data.getJudul;
        this.article.content = result.data.getIsi;
        this.article.publish = result.data.createdAt;
        this.article.modified = result.data.updatedAt;

        this.title.setTitle('' + this.article.title + ' - News | ' +this.dataService.baseTitle);
      })
  }

}
