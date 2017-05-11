import { Component, ViewEncapsulation } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../providers/data.service';

@Component({
	selector: 'editprofile',
	encapsulation: ViewEncapsulation.None,
	styleUrls: [ './editprofile.component.css' ],
	templateUrl: './editprofile.component.html'
})

export class EditProfileComponent{
	private name: string;
	private institution: string;
	private criteria: string;
	private birthdate: string;
	private gender: number;
	private phone: number;
	private submitted: boolean = false;

	constructor(public toast: ToastrService, public http: Http, public router: Router, public dataService: DataService){}

	ngOnInit(){
		window.scrollTo(0,0);
		// if(localStorage.getItem('token')){
		// 	this.router.navigate(['/']);
		// }
	}

	public submit(){
		this.submitted = true;
		let creds = JSON.stringify({name: this.name, institution: this.institution, criteria: this.criteria, birthdate: this.birthdate, gender: this.gender, phone: this.phone});
		console.log(creds);

	}

}