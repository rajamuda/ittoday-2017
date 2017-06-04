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
		id_user: '',
		nama_user: '',
		tingkat_user: '',
		institusi_user: '',
		alamat_user: '',
		telepon_user: '',
		kelamin_user: ''
	};

	public registHack: any = {
		id: '',
		has_regist: false,
		token: '',
		team_name: '',
		finalist: false,
		leader: '',
		member1: '-',
		member2: '-',
		writeup_submission: this.dataService.writeUpSubmission
	};

	public registApps: any = {
		id: '',
		has_regist: false,
		token: '',
		team_name: '',
		proposal: '',
		video: '',
		finalist: false,
		semifinalist: false,
		leader: '',
		member1: '-',
		member2: '-',
		first_submission: this.dataService.firstAppsSubmission,
		second_submission: this.dataService.secondAppsSubmission
	};

	public registSeminar: any = {
		has_regist: false
	};

	constructor(public title: Title, 
							public authHttp: AuthHttp, 
							public toast: ToastrService, 
							public router: Router, 
							public dataService: DataService)
	{
		if(localStorage.getItem('token')){
			let decode = this.jwtHelper.decodeToken(localStorage.getItem('token'));
			this.user.id_user = decode.id;
			this.authHttp.get(this.dataService.urlShowProfile+'/'+this.user.id_user)
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
				}, err => {
					this.toast.error('No internet connection', 'Failed');
				});
			this.infoRegisterApps(this.user.id_user);
			this.infoRegisterHack(this.user.id_user);
			this.infoRegisterSeminar(this.user.id_user);
		}else{
			this.router.navigate(['/auth/login']);
		}
	}

	ngOnInit(){
		window.scrollTo(0,0);
		this.title.setTitle('Dashboard | '+this.dataService.baseTitle);
	}

	public registHackSubmit(asnew: number){
		if(asnew == 1){
			let creds = {nama_team: this.registHack.team_name};
			this.authHttp.post(this.dataService.urlRegistHack, creds)
				.subscribe(res =>{
					let data = res.json();

					if(data.status){
						this.toast.success(data.message, 'Success');
						this.registHack.has_regist = true;
						this.infoRegisterHack(this.user.id_user);
					}else{
						if(data.err_code == 1062)
							this.toast.warning("Team name already exist", "Oops");
						else
							this.toast.warning(data.message, 'Oops');
					}
				}, err => {
					this.toast.error('No internet connection', 'Failed');
				});
		}else if(asnew == 0){
			let creds = {token_team: this.registHack.token};
			this.authHttp.post(this.dataService.urlRegistHackMember, creds)
				.subscribe(res =>{
					let data = res.json();

					if(data.status){
						this.toast.success(data.message, 'Success');
						this.registHack.has_regist = true;
						this.infoRegisterHack(this.user.id_user);
					}else{
						this.toast.warning(data.message, 'Oops');
					}
				}, err => {
					this.toast.error('No internet connection', 'Failed');
				});
		}
	}

	public registAppsSubmit(asnew: number){
		if(asnew == 1){
			let creds = {nama_team: this.registApps.team_name};
			this.authHttp.post(this.dataService.urlRegistApps, creds)
				.subscribe(res =>{
					let data = res.json();

					if(data.status){
						this.toast.success(data.message, 'Success');
						this.registApps.has_regist = true;
						this.infoRegisterApps(this.user.id_user);
					}else{
						if(data.err_code == 1062)
							this.toast.warning("Team name already exist", "Oops");
						else
							this.toast.warning(data.message, 'Oops');
					}
				}, err => {
					this.toast.error('No internet connection', 'Failed');
				});
		}else if(asnew == 0){
			let creds = {token_team: this.registApps.token};
			this.authHttp.post(this.dataService.urlRegistAppsMember, creds)
				.subscribe(res =>{
					let data = res.json();

					if(data.status){
						this.toast.success(data.message, 'Success');
						this.registApps.has_regist = true;
						this.infoRegisterApps(this.user.id_user);
					}else{
						this.toast.warning(data.message, 'Oops');
					}
				}, err => {
					this.toast.error('No internet connection', 'Failed');
				});
		}
	}

	public registSeminarSubmit(){
		this.authHttp.post(this.dataService.urlRegistSeminar, {})
			.subscribe(res => {
				let data = res.json();

				if(data.status){
					this.toast.success(data.message, 'success');
					this.registSeminar.has_regist = true;
				}else{
					this.toast.warning(data.message, 'Oops');
				}

			}, err => {
				this.toast.error('No internet connection', 'Failed');
			});
	}

	public confirmAttendSeminar(status: boolean){
		console.log(status);
	}

	public infoRegisterApps(id: number){
		this.authHttp.get(this.dataService.urlHasRegistApps+'/'+id)
				.subscribe(res => {
					let data = res.json();

					if(data.status){
						this.registApps.has_regist = true;
						let info = data.data;
						
						this.registApps.id = info.id;
						this.registApps.token = info.token_team;
						this.registApps.team_name = info.nama_team;
						this.registApps.semifinalist = info.semifinalis_team;
						this.registApps.finalist = info.finalis_team;
						// this.getInfoMemberApp(this.registApps.id);
						this.registApps.leader = data.leader[0].nama_user;
						if(data.member[0]){
							this.registApps.member1 = data.member[0].nama_user;
						}
						if(data.member[1]){
							this.registApps.member2 = data.member[1].nama_user;
						}
					}
				}, err => {
					this.toast.error('No internet connection', 'Failed');
				});
	}

	public infoRegisterHack(id: number){
		this.authHttp.get(this.dataService.urlHasRegistHack+'/'+id)
			.subscribe(res => {
				let data = res.json();

				if(data.status){
					this.registHack.has_regist = true;
					let info = data.data;

					this.registHack.id = info.id;
					this.registHack.token = info.token_team;
					this.registHack.team_name = info.nama_team;
					this.registHack.finalist = info.finalis_team;
					// this.getInfoMemberHack(this.registHack.id);
					this.registHack.leader = data.leader[0].nama_user;
					if(data.member[0]){
						this.registHack.member1 = data.member[0].nama_user;
					}
					if(data.member[1]){
						this.registHack.member2 = data.member[1].nama_user;
					}
				}
			}, err => {
				this.toast.error('No internet connection', 'Failed');
			});
	}

	public infoRegisterSeminar(id: number){
		this.authHttp.get(this.dataService.urlHasRegistSeminar+'/'+id)
			.subscribe(res => {
				let data = res.json();

				if(data.status){
					this.registSeminar.has_regist = true;
				}
			}, err => {
				this.toast.error('No internet connection', 'Failed');
			}); 
	}

	public showCopied(){
		this.toast.success('Token copied to clipboard', 'Copied');
	}
	/* Not Safe!! */
	// public getInfoMemberApp(id){
	// 	this.authHttp.get(this.dataService.urlHasRegistApps+'/team/'+id)
	// 		.subscribe(res => {
	// 			let data = res.json();

	// 			this.registApps.leader = data.leader[0].nama_user;
	// 			if(data.member[0]){
	// 				this.registApps.member1 = data.member[0].nama_user;
	// 			}
	// 			if(data.member[1]){
	// 				this.registApps.member2 = data.member[1].nama_user;
	// 			}
	// 		}, err => {
	// 			this.toast.error('No internet connection', 'Failed');
	// 		});
	// }

	// public getInfoMemberHack(id){
	// 	this.authHttp.get(this.dataService.urlHasRegistHack+'/team/'+id)
	// 		.subscribe(res => {
	// 			let data = res.json();

	// 			this.registHack.leader = data.leader[0].nama_user;
	// 			if(data.member[0]){
	// 				this.registHack.member1 = data.member[0].nama_user;
	// 			}
	// 			if(data.member[1]){
	// 				this.registHack.member2 = data.member[1].nama_user;
	// 			}
	// 		}, err => {
	// 			this.toast.error('No internet connection', 'Failed');
	// 		});
	// }

}