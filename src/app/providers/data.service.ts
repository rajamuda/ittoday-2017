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
	public baseUrl = 'https://localhost:4201';

	/* User */
	public urlLogin = this.baseUrl+'/api/user/login';
	public urlRegister = this.baseUrl+'/api/user/register';
	public urlSession = this.baseUrl+'/api/user/session';
	public urlEditProfile = this.baseUrl+'/api/user/editprofile';
	public urlShowProfile = this.baseUrl+'/api/user/showprofile';
	public urlUploadID = this.baseUrl+'/api/user/uploadid';

	/* AppsToday */
	public urlHasRegistApps = this.baseUrl+'/api/appteam/user';
	public urlRegistApps = this.baseUrl+'/api/appteam/create';
	public urlRegistAppsMember = this.baseUrl+'/api/appteam/registermember';

	/* HackToday */
	public urlHasRegistHack = this.baseUrl+'/api/hackteam/user';
	public urlRegistHack = this.baseUrl+'/api/hackteam/create';
	public urlRegistHackMember = this.baseUrl+'/api/hackteam/registermember';

	/* Seminar */
	public urlHasRegistSeminar = this.baseUrl+'/api/seminar/user';
	public urlRegistSeminar = this.baseUrl+'/api/seminar/register';

	/* custom VAR */
	public writeUpSubmission = false;
	public firstAppsSubmission = false;
	public secondAppsSubmission = false;

	loginAnnounced$ = this.isLoggedIn.asObservable();

	public loginState(state){
			this.isLoggedIn.next(state);
	}


}