import { Component, ViewEncapsulation } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { DataService } from '../../providers/data.service';

@Component({
	selector: 'register',
	encapsulation: ViewEncapsulation.None,
	templateUrl: './register.component.html'
})

export class RegisterComponent{
	private email;
	private password;
	private repassword;

	constructor(public http: Http, public router: Router, public dataService: DataService){}

	ngOnInit(){
		if(localStorage.getItem('token')){
			this.router.navigate(['/']);
		}
	}

	public submit(){
		
	}

}