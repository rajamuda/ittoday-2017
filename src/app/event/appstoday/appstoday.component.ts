import { Component, ViewEncapsulation } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { DataService } from '../../providers/data.service';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'appstoday',
	encapsulation: ViewEncapsulation.None,
	styleUrls: [ './appstoday.component.css' ],
	templateUrl: './appstoday.component.html'
})

export class AppsTodayComponent{

	constructor(public title: Title, 
							public http: Http, 
							public router: Router, 
							public dataService: DataService)
	{}

	ngOnInit(){
		window.scrollTo(0,0);
		this.title.setTitle('AppsToday | '+this.dataService.baseTitle);
	}

	public submit(){
		console.log("hello");
	}

}