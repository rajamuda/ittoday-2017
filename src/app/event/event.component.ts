import { Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'event',
	encapsulation: ViewEncapsulation.None,
	template: '<router-outlet></router-outlet>'
})

export class EventComponent{
	constructor(){}
	
}