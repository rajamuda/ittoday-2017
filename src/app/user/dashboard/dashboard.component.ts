import { Component, ViewEncapsulation } from '@angular/core';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../providers/data.service';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'dashboard',
	encapsulation: ViewEncapsulation.None,
	templateUrl: './dashboard.component.html'
})

export class DashboardComponent{

	jwtHelper: JwtHelper = new JwtHelper();

	constructor(public title: Title, public authHttp: AuthHttp, public toast: ToastrService, public router: Router, public dataService: DataService){}

	ngOnInit(){
		window.scrollTo(0,0);
		this.title.setTitle('Dashboard | '+this.dataService.baseTitle);
		if(localStorage.getItem('token')){
			let decode = this.jwtHelper.decodeToken(localStorage.getItem('token'));
			this.authHttp.get(this.dataService.urlShowProfile+'/'+decode.id)
				.subscribe(res => {
					let data = res.json();
					let profile = data.data[0];
					if(profile.status_user == false){
						this.router.navigate(['/user/editprofile']);
						this.toast.info('Please, complete your profile info', 'Information');
					}
				});
		}else{
			this.router.navigate(['/auth/login']);
		}
	}

	public submit(){
		
	}

}