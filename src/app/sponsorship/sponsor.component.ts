import { Component } from '@angular/core';
import { DataService } from '../providers/data.service';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'sponsor',
	templateUrl: './sponsor.component.html'
})

export class SponsorComponent{
	constructor(public title: Title,
							public dataService: DataService)
	{}

	ngOnInit(){
		window.scrollTo(0,0);
		this.title.setTitle('Sponsorship | '+this.dataService.baseTitle);
	}
}