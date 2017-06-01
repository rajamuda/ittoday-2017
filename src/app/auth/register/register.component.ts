import { Component, ViewEncapsulation } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../providers/data.service';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'register',
	encapsulation: ViewEncapsulation.None,
	styleUrls: [ './register.component.css' ],
	templateUrl: './register.component.html'
})

export class RegisterComponent{
	private name: string;
	private email: string;
	private password: string;
	private repassword: string;
	private submitted: boolean = false;

	constructor(public title: Title, 
							public toast: ToastrService, 
							public http: Http, 
							public router: Router, 
							public dataService: DataService)
	{
		if(localStorage.getItem('token')){
			this.router.navigate(['/']);
		}
	}

	ngOnInit(){
		window.scrollTo(0,0);
		this.title.setTitle('Register | '+this.dataService.baseTitle);
	}

	public submit(){
		this.submitted = true;
		let creds = JSON.stringify({nama_user: this.name, email_user: this.email, password_user: this.password, password_lagi: this.repassword});
		
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		this.http.post(this.dataService.urlRegister, creds, {headers: headers})
			.subscribe(res => {
				let data = res.json();

				if(data.status){
					this.toast.success(data.message, 'Success');
					creds = JSON.stringify({email_user: this.email, password_user: this.password, rembember_me: false});
					this.http.post(this.dataService.urlLogin, creds, {headers: headers})
						.subscribe(res => {
							let info = res.json();
							localStorage.setItem('token', info.token);
							this.dataService.loginState(true);
							this.router.navigate(['/user/dashboard']);
						})
				}else{
					if(data.err_code == 1062)
						this.toast.warning("Email has been registered", 'Oops');
					else
						this.toast.warning(data.message, 'Failed');
				}

			}, err => {
				this.toast.error('No connection', 'Failed!');
			});

	}

}