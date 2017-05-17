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
	private criterion: any = [
		{ value: '', display: 'Pilih Salah Satu', disabled: true },
		{ value: 'sma', display: 'SMA/SMK', disabled: false },
		{ value: 's1', display: 'Mahasiswa (S1)', disabled: false },
		{ value: 'general', display: 'Umum', disabled: false }
	];
	private genders: any = [
		{ value: 'M', display: 'Male' },
		{ value: 'F', display: 'Female' }
	];
	private user: any = {
		name: '',
		institution: '',
		criteria: this.criterion[0],
		phone: '',
		gender: this.genders[0].value,
		address: '',
	}
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
		// let creds = JSON.stringify({name: this.name, institution: this.institution, criteria: this.criteria, birthdate: this.birthdate, gender: this.gender, phone: this.phone});
		// console.log(creds);

	}

}