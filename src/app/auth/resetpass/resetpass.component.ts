import { Component, ViewEncapsulation } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../providers/data.service';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'resetpass',
	encapsulation: ViewEncapsulation.None,
	styleUrls: [ './resetpass.component.css' ],
	templateUrl: './resetpass.component.html'
})

export class ResetPassComponent{
	private resetpass: any = {
		token: '',
		new_pass: '',
		new_pass_confirm: '',
		email: '' 
	}

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
		this.title.setTitle('Reset Password | '+this.dataService.baseTitle);
	}

	public submitMail(){
		let creds = JSON.stringify({email_user: this.resetpass.mail});

		this.http.post(this.dataService.urlRegistApps, creds)
			.subscribe(res => {
				let data = res.json();

				if(data.status){
		 			this.toast.success('Check your e-mail ('+ this.resetpass.mail +')', data.message);
				}else{
					this.toast.warning(data.message, 'Failed');
				}

			}, err => {
		 		this.toast.error('No connection', 'Failed');
			})
	}

	public confirmReset(){
		 let creds = JSON.stringify({token: this.resetpass.token, pass_baru: this.resetpass.new_pass, pass_baru2: this.resetpass.new_pass_confirm});

		 var headers = new Headers();
		 headers.append('Content-Type', 'application/json');
		 headers.append('Authorization', this.resetpass.token);
		 this.http.post(this.dataService.urlConfirmResetPass, creds, {headers: headers})
		 	.subscribe(res => {
		 		let data = res.json();

		 		if(data.status){
		 			this.router.navigate(['/auth/login']);
		 			this.toast.success(data.message, 'Success');
		 		}else{
		 			this.toast.warning(data.message, 'Failed');
		 		}
		 	}, err => {
		 		this.toast.error('No connection', 'Failed');
		 	});
	}
}
