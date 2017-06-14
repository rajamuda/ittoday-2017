import { Component, ViewEncapsulation } from '@angular/core';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../providers/data.service';
import { UploadService } from '../../providers/upload.service';
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
		writeup: '',
		finalist: false,
		leader: '',
		member1: '-',
		member2: '-',
		writeup_submission: this.dataService.writeUpSubmission,
		url_rulebook: ''
	};

	public registApps: any = {
		id: '',
		has_regist: false,
		token: '',
		team_name: '',
		app_name: '',
		proposal: '',
		video: '',
		finalist: false,
		semifinalist: false,
		leader: '',
		member1: '-',
		member2: '-',
		first_submission: this.dataService.firstAppsSubmission,
		second_submission: this.dataService.secondAppsSubmission,
		url_rulebook: ''
	};

	public registSeminar: any = {
		has_regist: false
	};

	private proposalFile: Array<File>;
	private proposalValid;
	private proposalSubmit = false;

	private writeupFile: Array<File>;
	private writeupValid;
	private writeupSubmit = false

	private uploadProgress = 0;

	constructor(public title: Title, 
							public authHttp: AuthHttp, 
							public toast: ToastrService, 
							public router: Router, 
							public dataService: DataService,
							public uploadService: UploadService)
	{
		this.uploadService.progress$.subscribe(status => {
			this.uploadProgress = status;
		});

		this.registApps.url_rulebook = this.dataService.urlRulebookApps;
		this.registHack.url_rulebook = this.dataService.urlRulebookHack;

		if(localStorage.getItem('token')){
			let decode = this.jwtHelper.decodeToken(localStorage.getItem('token'));
			this.user.id_user = decode.id;
			this.authHttp.get(this.dataService.urlShowProfile+'/'+this.user.id_user)
				.subscribe(res => {
					let data = res.json();
					let profile = data.data[0];
					this.user.nama_user = profile.nama_user;

					if(profile.tingkat_user == 'SMA'){
						this.user.tingkat_user = 'SMA/SMK';
					}else if(profile.tingkat_user == 'S1'){
						this.user.tingkat_user = 'Mahasiswa';
					}else{
						this.user.tingkat_user = 'Umum';
					}

					this.user.institusi_user = profile.institusi_user;
					
					this.user.alamat_user = profile.alamat_user;
					this.user.telepon_user = profile.telepon_user;
					this.user.kelamin_user = profile.kelamin_user;

					console.log(profile.user_identity_null);
					if(profile.status_user == false){
						this.router.navigate(['/user/editprofile']);
						this.toast.info('Please, complete your profile info', 'Information');
					}else if(profile.user_identity_null == true){
						this.router.navigate(['/user/editprofile']);
						this.toast.info('Karena miskonfigurasi sistem upload, mohon upload kembali informasi kartu identitas Anda', 'Information');
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

	hackWriteUpChange(fileInput: any){
		this.registHack.writeup = '';
    this.writeupFile = <Array<File>> fileInput.target.files;

    if(!this.writeupFile.length){
    	this.writeupValid = false;
    }

    /* Validasi tipe file */
   	if(this.writeupFile[0].type != "application/pdf"){
   		this.writeupValid = false;
   	}else{
	  	/* Cek ukuran PDF */
	   	if(this.writeupFile[0].size > 5*1024*1024){
	   		this.writeupValid = false;
	   	}else{
	   		this.writeupValid = true;
	   	}	
   	}	
	}

	public writeupSubmission(){
		this.writeupSubmit = true;
		if(!this.registHack.writeup){
			let params = {authorization: localStorage.getItem('token'), name: 'writeup', team: this.registHack.team_name};
			this.uploadService.makeFileRequest(this.dataService.urlUploadWriteUp, params, this.writeupFile).then((result: any) => {
	      if(result.status){
	      	this.toast.success(result.message, 'Success');
	      	this.registHack.writeup = result.filelocation;    
	      }else{
	      	if(result.message)
	      		this.toast.warning(result.message, 'Failed');
	      	else
	      		this.toast.warning('Server error while uploading', 'Failed');
	      	this.writeupSubmit = false;
	      	this.uploadProgress = 0;
	      }
	    }, (error) => {
	      console.error(error);
	      this.writeupSubmit = false;
	    });
		}
	}

	appsProposalChange(fileInput: any){
		this.registApps.proposal = '';
    this.proposalFile = <Array<File>> fileInput.target.files;

    /* Validasi tipe file */
   	if(this.proposalFile[0].type != "application/pdf"){
   		this.proposalValid = false;
   	}else{
	   	/* Cek ukuran PDF */
	   	if(this.proposalFile[0].size > 5*1024*1024){
	   		this.proposalValid = false;
	   	}else{
	   		this.proposalValid = true;
	   	}
   	}

  }

	public appsFirstSubmission(){
		this.proposalSubmit = true;
		if(!this.registApps.proposal){
			let params = {authorization: localStorage.getItem('token'), name: 'proposal', team: this.registApps.team_name};
			this.uploadService.makeFileRequest(this.dataService.urlUploadProposal, params, this.proposalFile).then((result: any) => {
	      if(result.status){
	      	this.toast.success(result.message, 'Success');
	      	this.registApps.proposal = result.filelocation;
	      	this.updateAppsSubmission();      
	      }else{
	      	if(result.message)
	      		this.toast.warning(result.message, 'Failed');
	      	else
	      		this.toast.warning('Server error while uploading', 'Failed');
	      	this.proposalSubmit = false;
	      	this.uploadProgress = 0;
	      }
	    }, (error) => {
	      console.error(error);
	      this.proposalSubmit = false;
	    });
		}

		if(this.registApps.proposal){
			this.updateAppsSubmission();		
		}
	}

	public updateAppsSubmission(){
		let creds = {nama_app: this.registApps.app_name, proposal_app: this.registApps.proposal, video_app: this.registApps.video};

		this.authHttp.post(this.dataService.urlAppsSubmission, creds)
			.subscribe(res => {
				let data = res.json();
				if(data.status){
					this.toast.success(data.message, 'Success');
				}else{
					this.toast.warning(data.message, 'Failed');
					this.proposalSubmit = false;
				}
			}, err => {
				this.toast.error('No internet connection', 'Failed');
				this.proposalSubmit = false;
			});
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
						this.registApps.app_name = info.nama_app;
						this.registApps.proposal = info.proposal_app;
						this.registApps.video = info.video_app;

						if(this.registApps.proposal){
							this.proposalValid = true;
						}

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
					this.registHack.writeup = info.writeup_hack;

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
}