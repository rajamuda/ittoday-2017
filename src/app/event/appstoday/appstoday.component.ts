import { Component, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../providers/data.service';

@Component({
	selector: 'appstoday',
	encapsulation: ViewEncapsulation.None,
	styleUrls: [ './appstoday.component.css' ],
	templateUrl: './appstoday.component.html'
})

export class AppsTodayComponent{
	public url_rulebook = '';
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
				this.url_rulebook = data.rulebook.appstoday;
				this.event_desc = data.event_desc.appstoday;
				this.rulebook_update = data.rulebook.appstoday_update;
				this.reward = data.event_reward.appstoday;
				this.schedule = data.event_date.appstoday;
				this.checker = true;
			}, err => {
				console.log(err);
			})
	}

	ngOnInit(){
		window.scrollTo(0,0);
		this.title.setTitle('AppsToday | '+this.dataService.baseTitle);
	}

}