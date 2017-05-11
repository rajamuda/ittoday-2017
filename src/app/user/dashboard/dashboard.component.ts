import { Component, ViewEncapsulation } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { DataService } from '../../providers/data.service';

@Component({
	selector: 'dashboard',
	encapsulation: ViewEncapsulation.None,
	templateUrl: './dashboard.component.html'
})

export class DashboardComponent{
	private email;
	private password;
	private repassword;

	constructor(public http: Http, public router: Router, public dataService: DataService){}

	ngOnInit(){
		window.scrollTo(0,0);
	}

	public submit(){
		
	}

}