import { Component, ViewEncapsulation } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../providers/data.service';

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

	constructor(public toast: ToastrService, public http: Http, public router: Router, public dataService: DataService){}

	ngOnInit(){
		window.scrollTo(0,0);
		if(localStorage.getItem('token')){
			this.router.navigate(['/']);
		}
	}

	public submit(){
		this.submitted = true;
		let creds = JSON.stringify({name: this.name, email: this.email, pass: this.password, pass2: this.repassword});
		console.log(creds);

	}

}