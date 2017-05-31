import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class DataService{
	public token: string;
	public loginUrl: string;
	public userdata: any;
	public id_user: number;
	public isLoggedIn = new Subject<boolean>();

	public baseTitle = 'IT Today IPB 2017 - CreativITy';
	public baseUrl = 'http://localhost:4200';
	public urlLogin = this.baseUrl+'/api/user/login';
	public urlRegister = this.baseUrl+'/api/user/register';
	public urlSession = this.baseUrl+'/api/user/session';
	public urlEditProfile = this.baseUrl+'/api/user/editprofile';
	public urlShowProfile = this.baseUrl+'/api/user/showprofile';
	public urlUploadID = this.baseUrl+'/api/user/uploadid';
	public urlHasRegistApps = this.baseUrl+'/api/appteam';
	public urlRegistApps = this.baseUrl+'/api/appteam/create';
	public urlRegistAppsMember = this.baseUrl+'/api/appteam/registermember';
	public urlHasRegistHack = this.baseUrl+'/api/hackteam';
	public urlRegistHack = this.baseUrl+'/api/hackteam/create';
	public urlRegistHackMember = this.baseUrl+'/api/hackteam/registermember';


	loginAnnounced$ = this.isLoggedIn.asObservable();

	public loginState(state){
			this.isLoggedIn.next(state);
	}


}