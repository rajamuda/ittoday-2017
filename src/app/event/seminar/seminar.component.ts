import { Component, ViewEncapsulation } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { DataService } from '../../providers/data.service';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'seminar',
	encapsulation: ViewEncapsulation.None,
	styleUrls: [ './seminar.component.css' ],
	templateUrl: './seminar.component.html'
})

export class SeminarComponent{
	public speaker = '';
	public event_desc: any = {};
	public schedule: any = {};
	public checker = false;

	constructor(public title: Title, 
							public http: Http, 
							public router: Router, 
							public dataService: DataService)
	{
		this.http.get("assets/data/data.json")
			.subscribe(res => {
				let data = res.json();
				this.event_desc = data.event_desc.seminar;
				this.speaker = data.seminar_speaker;
				this.schedule = data.event_date.seminar;
				this.checker = true;
			}, err => {
				console.log(err);
			})
	}
	
	ngOnInit(){
		window.scrollTo(0,0);
		this.title.setTitle('Seminar IT | '+this.dataService.baseTitle);
	}

	public submit(){
		
	}

}