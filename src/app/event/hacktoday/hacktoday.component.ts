import { Component, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { DataService } from '../../providers/data.service';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'hacktoday',
	encapsulation: ViewEncapsulation.None,
	styleUrls: [ './hacktoday.component.css' ],
	templateUrl: './hacktoday.component.html'
})

export class HackTodayComponent{
	private url_rulebook = '';
	public event_desc = '';
	public rulebook_update = '';
	public reward: any = {};
	public schedule: any = {};
	public checker = false;

	constructor(public title: Title, 
							public http: Http, 
							public router: Router, 
							public dataService: DataService)
	{
		this.dataService.getData()
			.subscribe(data => {
				this.url_rulebook = data.rulebook.hacktoday;
				this.event_desc = data.event_desc.hacktoday;
				this.rulebook_update = data.rulebook.hacktoday_update;
				this.reward = data.event_reward.hacktoday;
				this.schedule = data.event_date.hacktoday;
				this.checker = true;
			}, err => {
				console.log(err);
			})
	}
	
	ngOnInit(){
		window.scrollTo(0,0);
		this.title.setTitle('HackToday | '+this.dataService.baseTitle);
	}

	public submit(){
		
	}

}