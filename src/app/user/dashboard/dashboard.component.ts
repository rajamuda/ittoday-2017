import { Component, ViewEncapsulation } from '@angular/core';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../providers/data.service';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'dashboard',
	encapsulation: ViewEncapsulation.None,
	styleUrls: [ './dashboard.component.css' ],
	templateUrl: './dashboard.component.html'
})

export class DashboardComponent{

	jwtHelper: JwtHelper = new JwtHelper();
	public user: any = {
		nama_user: '',
		tingkat_user: '',
		institusi_user: '',
		alamat_user: '',
		telepon_user: '',
		kelamin_user: ''
	};

	public registHack: any = {
		has_regist: 'false',
		token: '',
		team_name: '',
		finalist: 'false'
	};

	public registApps: any = {
		has_regist: 'false',
		token: '',
		team_name: '',
		proposal: '',
		video: '',
		finalist: 'false'
	};

	public registSeminar: any = {
		has_regist: 'false'
	};

	constructor(public title: Title, 
							public authHttp: AuthHttp, 
							public toast: ToastrService, 
							public router: Router, 
							public dataService: DataService)
	{
		if(localStorage.getItem('token')){
			let decode = this.jwtHelper.decodeToken(localStorage.getItem('token'));
			this.authHttp.get(this.dataService.urlShowProfile+'/'+decode.id)
				.subscribe(res => {
					let data = res.json();
					let profile = data.data[0];

					this.user.nama_user = profile.nama_user;
					this.user.tingkat_user = profile.tingkat_user;
					this.user.institusi_user = profile.institusi_user;
					this.user.alamat_user = profile.alamat_user;
					this.user.telepon_user = profile.telepon_user;
					this.user.kelamin_user = profile.kelamin_user;

					if(profile.status_user == false){
						this.router.navigate(['/user/editprofile']);
						this.toast.info('Please, complete your profile info', 'Information');
					}
				});
		}else{
			this.router.navigate(['/auth/login']);
		}
	}

	ngOnInit(){
		window.scrollTo(0,0);
		this.title.setTitle('Dashboard | '+this.dataService.baseTitle);
	}

	public registHackSubmit(){
		console.log(this.registHack);
	}

	public registAppsSubmit(){
		console.log(this.registApps);
	}

	public registSeminarSubmit(){
		
	}

}