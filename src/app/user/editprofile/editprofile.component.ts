import { Component, ViewEncapsulation } from '@angular/core';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../providers/data.service';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'editprofile',
	encapsulation: ViewEncapsulation.None,
	styleUrls: [ './editprofile.component.css' ],
	templateUrl: './editprofile.component.html'
})

export class EditProfileComponent{
	private criterion: any = [
		{ value: '', display: 'Pilih Salah Satu', disabled: true },
		{ value: 'SMA', display: 'SMA/SMK', disabled: false },
		{ value: 'S1', display: 'Mahasiswa (Diploma/S1)', disabled: false },
		{ value: 'Umum', display: 'Umum', disabled: false }
	];
	private genders: any = [
		{ value: 'L', display: 'Male' },
		{ value: 'P', display: 'Female' }
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

	jwtHelper: JwtHelper = new JwtHelper();

	constructor(public title: Title, public toast: ToastrService, public authHttp: AuthHttp, public router: Router, public dataService: DataService){}

	ngOnInit(){
		window.scrollTo(0,0);
		this.title.setTitle('Profile Information | '+this.dataService.baseTitle);
		if(localStorage.getItem('token')){
			let decode = this.jwtHelper.decodeToken(localStorage.getItem('token'));
			this.authHttp.get(this.dataService.urlShowProfile+'/'+decode.id)
				.subscribe(res => {
					let data = res.json();
					let profile = data.data[0];
					
					if(profile.status_user == true){
						this.user.name = profile.nama_user;
						this.user.institution = profile.institusi_user;
						this.user.phone = profile.telepon_user;
						this.user.address = profile.alamat_user;
						this.user.gender = profile.kelamin_user;
						if(profile.tingkat_user == 'SMA'){
							this.user.criteria = this.criterion[1];
						}else if(profile.tingkat_user = 'S1'){
							this.user.criteria = this.criterion[2];
						}else{
							this.user.criteria = this.criterion[3];
						}
					}else{
						this.user.name = profile.nama_user;
					}
				});
		}else{
			this.router.navigate['/auth/login'];
		}
	}

	public submit(){
		this.submitted = true;
		let creds = JSON.stringify({nama_user: this.user.name, institusi_user: this.user.institution, tingkat_user: this.user.criteria.value, kelamin_user: this.user.gender, telepon_user: this.user.phone, alamat_user: this.user.address});
		this.authHttp.post(this.dataService.urlEditProfile, creds)
			.subscribe(res => {
				let data = res.json();

				if(data.status){
					this.toast.success(data.message, 'Success');
				}else{
					this.toast.warning(data.message, 'Failed');
				}
			}, err => {
				this.toast.error('No internet connection', 'Failed');
			})

	}

}