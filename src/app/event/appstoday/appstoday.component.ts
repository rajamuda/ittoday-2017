import { Component, ViewEncapsulation } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { DataService } from '../../providers/data.service';

@Component({
	selector: 'appstoday',
	encapsulation: ViewEncapsulation.None,
	templateUrl: './appstoday.component.html'
})

export class AppsTodayComponent{

	constructor(public http: Http, public router: Router, public dataService: DataService){}

	ngOnInit(){
		window.scrollTo(0,0);
	}

	public submit(){
		console.log("hello");
	}

}