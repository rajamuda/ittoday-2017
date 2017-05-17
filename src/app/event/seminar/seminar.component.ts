import { Component, ViewEncapsulation } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { DataService } from '../../providers/data.service';

@Component({
	selector: 'seminar',
	encapsulation: ViewEncapsulation.None,
	templateUrl: './seminar.component.html'
})

export class SeminarComponent{

	constructor(public http: Http, public router: Router, public dataService: DataService){}

	ngOnInit(){
		window.scrollTo(0,0);
	}

	public submit(){
		
	}

}