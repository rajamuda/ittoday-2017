import { Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'auth',
	encapsulation: ViewEncapsulation.None,
	template: '<router-outlet></router-outlet>'
})

export class AuthComponent{
	constructor(){}
	
}