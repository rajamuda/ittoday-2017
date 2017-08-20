import { Component } from '@angular/core';
import { DataService } from '../providers/data.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
	selector: 'sponsor',
	templateUrl: './sponsor.component.html',
	styleUrls: [ './sponsor.component.css' ],
})

export class SponsorComponent{
	constructor(public title: Title,
							public dataService: DataService,
							public route: Router)
	{}

	ngOnInit(){
		window.scrollTo(0,0);
		this.title.setTitle('Sponsorship | '+this.dataService.baseTitle);
		this.route.navigate(['/']);
	}
}