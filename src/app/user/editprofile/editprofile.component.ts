import { Component, ViewEncapsulation } from '@angular/core';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../providers/data.service';
import { UploadService } from '../../providers/upload.service';
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
		{ value: 'SMA', display: 'SMA/SMK Sederajat', disabled: false },
		{ value: 'S1', display: 'Mahasiswa', disabled: false },
		{ value: 'Umum', display: 'Umum', disabled: false }
	];
	private genders: any = [
		{ value: 'L', display: 'Laki-laki' },
		{ value: 'P', display: 'Perempuan' }
	];
	private user: any = {
		name: '',
		institution: '',
		criteria: this.criterion[0],
		phone: '',
		gender: this.genders[0].value,
		address: '',
		identity: '',
		status: false
	}
	private submitted: boolean = false;
	private filevalid: boolean = false;
	private filelocation: string;
	private hasUpload: boolean = false;
	private uploadProgress: number = 0;

  private filesToUpload: Array<File>;

	jwtHelper: JwtHelper = new JwtHelper();

	constructor(public uploadService: UploadService, 
							public title: Title, 
							public toast: ToastrService, 
							public authHttp: AuthHttp, 
							public router: Router, 
							public dataService: DataService)
	{
		this.uploadService.progress$.subscribe(status => {
			this.uploadProgress = status;
		});
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
						this.user.status = profile.status_user;

						if(profile.identitas_user != null){
							this.filevalid = true;
							this.filelocation = profile.identitas_user;
							this.hasUpload = true;
						}

						if(profile.tingkat_user == 'SMA'){
							this.user.criteria = this.criterion[1];
						}else if(profile.tingkat_user == 'S1'){
							this.user.criteria = this.criterion[2];
						}else{
							this.user.criteria = this.criterion[3];
						}
					}else{
						this.user.name = profile.nama_user;
					}
				});
		}else{
			this.router.navigate(['/auth/login']);
		}
	}

	ngOnInit(){
		window.scrollTo(0,0);
		this.title.setTitle('Profile Information | '+this.dataService.baseTitle);
	}

	fileChangeEvent(fileInput: any){
		this.hasUpload = false;
    this.filesToUpload = <Array<File>> fileInput.target.files;

    /* Validasi tipe file */
   	if(this.filesToUpload[0].type != "image/jpeg" && this.filesToUpload[0].type != "image/png"){
   		this.filevalid = false;
   	}else{
	   	/* Cek ukuran gambar */
	   	if(this.filesToUpload[0].size > 2097152){
	   		this.filevalid = false;
	   	}else{
	   		this.filevalid = true;
	   	}
   	}
  }


	public submit(){
		this.submitted = true;

		if(!this.hasUpload){
			let params = {authorization: localStorage.getItem('token'), name: 'idcard'}
			this.uploadService.makeFileRequest(this.dataService.urlUploadID, params, this.filesToUpload).then((result: any) => {
	      if(result.status){
	      	this.toast.success(result.message, 'Success');
	      	this.filelocation = result.filelocation;
	      	this.hasUpload = true;
	      	this.update();      
	      }else{
	      	if(result.message)
	      		this.toast.warning(result.message, 'Failed');
	      	else
	      		this.toast.warning('Server error while uploading', 'Failed');

	      	this.uploadProgress = 0;
	      	this.submitted = false;
	      }
	    }, (error) => {
	      console.error(error);
	      this.submitted = false;
	    });
		}

		if(this.hasUpload){
			this.update();		
		}
	}

	public update(){
		let creds = JSON.stringify({nama_user: this.user.name, institusi_user: this.user.institution, tingkat_user: this.user.criteria.value, kelamin_user: this.user.gender, identitas_user: this.filelocation, telepon_user: this.user.phone, alamat_user: this.user.address});
			this.authHttp.post(this.dataService.urlEditProfile, creds)
				.subscribe(res => {
					let data = res.json();

					if(data.status){
						this.toast.success(data.message, 'Success');
					}else{
						this.toast.warning(data.message, 'Failed');
						this.submitted = false;
					}
				}, err => {
					this.toast.error('No internet connection', 'Failed');
					this.submitted = false;
				})
	}

}