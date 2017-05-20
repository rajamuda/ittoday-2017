import { Component, ViewEncapsulation } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { ToastrService } from 'toastr-ng2';
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

	constructor(public toast: ToastrService, public http: Http, public router: Router, public dataService: DataService){}
	
	ngOnInit(){
		window.scrollTo(0,0);
		if(localStorage.getItem('token')){
			this.router.navigate(['/']);
		}
	}

	public submit(){
		 let creds = JSON.stringify({email_user: this.email, password_user: this.password, remember_me: false});

		 var headers = new Headers();
		 headers.append('Content-Type', 'application/json');
		 this.http.post(this.dataService.urlLogin, creds, {headers: headers})
		 	.subscribe(res => {
		 		let data = res.json();
		 		console.log(data);
		 		if(data.status){
		 			localStorage.setItem('token', data.token);
		 			this.dataService.loginState(true);
		 			this.router.navigate(['/user/dashboard']);
		 			this.toast.success(data.message, 'Success');
		 		}else{
		 			this.toast.warning(data.message, 'Failed');
		 		}
		 	}, err => {
		 		this.toast.error('No connection', 'Failed');
		 	});
	}
}
