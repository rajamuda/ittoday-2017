import { Component, ViewEncapsulation } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
		email: '',
		name: '',
		confirm: '',
		token_valid: false
	}

	constructor(public title: Title, 
							public toast: ToastrService, 
							public http: Http, 
							public router: Router, 
							public route: ActivatedRoute,
							public dataService: DataService)
	{
		if(localStorage.getItem('token')){
			this.router.navigate(['/']);
		}

		this.route.queryParams.subscribe((params: Params) => {
			this.resetpass.confirm = params['confirm'];
		})
	}
	
	ngOnInit(){
		window.scrollTo(0,0);
		this.title.setTitle('Reset Password | '+this.dataService.baseTitle);
	}

	public submitMail(){
		let creds = JSON.stringify({email_user: this.resetpass.email});

		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		this.http.post(this.dataService.urlResetPass, creds, {headers: headers})
			.subscribe(res => {
				let data = res.json();

				if(data.status){
		 			this.toast.success('Check your e-mail ('+ this.resetpass.email +')', data.message);
				}else{
					this.toast.warning(data.message, 'Failed');
				}

			}, err => {
		 		this.toast.error('No connection', 'Failed');
			})
	}

	public confirmReset(id){
		var creds;
		if(id == 0)
		 	creds = JSON.stringify({pass_baru: this.resetpass.new_pass, pass_baru2: this.resetpass.new_pass_confirm});
		else
			creds = {check_token_only: true}; 

		 var headers = new Headers();
		 headers.append('Content-Type', 'application/json');
		 headers.append('Authorization', this.resetpass.token);
		 this.http.post(this.dataService.urlConfirmResetPass, creds, {headers: headers})
		 	.subscribe(res => {
		 		let data = res.json();
		 		if(id == 0){
			 		if(data.status){
			 			this.router.navigate(['/auth/login']);
			 			this.toast.success(data.message, 'Success');
			 		}else{
			 			this.toast.warning(data.message, 'Failed');
			 		}
			 	}else{
			 		if(data.status){
			 			this.toast.success('You can now reset your account password', data.message);
			 			this.resetpass.token_valid = true;

			 			let info = data.data;
			 			this.resetpass.email = info.email_user;
			 			this.resetpass.name = info.nama_user;
			 		}else{
			 			this.toast.error(data.message, 'Wrong token');
			 			this.resetpass.token_valid = false;
			 		}
			 	}
		 	}, err => {
		 		this.toast.error('No connection', 'Failed');
		 	});
		}
}
