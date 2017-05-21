import { Component, ViewEncapsulation } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { DataService } from '../../providers/data.service';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'hacktoday',
	encapsulation: ViewEncapsulation.None,
	templateUrl: './hacktoday.component.html'
})

export class HackTodayComponent{

	constructor(public title: Title, public http: Http, public router: Router, public dataService: DataService){}

	ngOnInit(){
		window.scrollTo(0,0);
		this.title.setTitle('HackToday | '+this.dataService.baseTitle);
	}

	public submit(){
		
	}

}