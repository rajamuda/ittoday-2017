import { Component, ViewEncapsulation } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Component({
	selector: 'user',
	encapsulation: ViewEncapsulation.None,
	templateUrl: './user.component.html'
})

export class UserComponent{
	public email: string;
	public password: string;

	constructor(public http: Http){}
	
	public submit(){
		 let creds = JSON.stringify({email: this.email, pass: this.password});

		 var headers = new Headers();
		 headers.append('Content-Type', 'application/json');
		 this.http.post('http://localhost:4200/login', creds, {headers: headers})
		 	.subscribe(res => {
		 		let data = res.json();
		 		console.log(data);
		 		if(data['status']){
		 			console.log("You've been logged in");
		 		}else{
		 			console.log(data['message']);
		 		}
		 	});
	}
}
