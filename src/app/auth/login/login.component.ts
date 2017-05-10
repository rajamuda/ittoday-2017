import { Component, ViewEncapsulation } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { DataService } from '../../providers/data.service';

@Component({
	selector: 'login',
	encapsulation: ViewEncapsulation.None,
	styleUrls: [ './login.component.css' ],
	templateUrl: './login.component.html'
})

export class LoginComponent{
	private email: string;
	private password: string;

	constructor(public http: Http, public router: Router, public dataService: DataService){}
	
	ngOnInit(){
		if(localStorage.getItem('token')){
			this.router.navigate(['/']);
		}
	}

	public submit(){
		 let creds = JSON.stringify({email: this.email, pass: this.password});

		 var headers = new Headers();
		 headers.append('Content-Type', 'application/json');
		 this.http.post('http://localhost:4200/login', creds, {headers: headers})
		 	.subscribe(res => {
		 		let data = res.json();
		 		console.log(data);
		 		if(data['status']){
		 			localStorage.setItem('token', data['token']);
		 			this.dataService.loginState(true);
		 			this.router.navigate(['/']);
		 			console.log("You've been logged in");
		 		}else{
		 			console.log(data['message']);
		 		}

		 	});
	}
}
