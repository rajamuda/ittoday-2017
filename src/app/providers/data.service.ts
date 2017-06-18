import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService{
	public token: string;
	public loginUrl: string;
	public userdata: any;
	public id_user: number;
	public isLoggedIn = new Subject<boolean>();

	public baseTitle = 'IT Today IPB 2017 - CreativITy';
	// public baseUrl = 'https://ittoday.web.id';
	public baseUrl = 'http://localhost:4200';

	/* User */
	public urlLogin = this.baseUrl+'/api/user/login';
	public urlRegister = this.baseUrl+'/api/user/register';
	public urlSession = this.baseUrl+'/api/user/session';
	public urlEditProfile = this.baseUrl+'/api/user/editprofile';
	public urlShowProfile = this.baseUrl+'/api/user/showprofile';
	public urlUploadID = this.baseUrl+'/api/user/uploadid';
	public urlResetPass = this.baseUrl+'/api/user/resetpass';
	public urlConfirmResetPass = this.baseUrl+'/api/user/confirmresetpass';

	/* AppsToday */
	public urlHasRegistApps = this.baseUrl+'/api/appteam/user';
	public urlRegistApps = this.baseUrl+'/api/appteam/create';
	public urlRegistAppsMember = this.baseUrl+'/api/appteam/registermember';
	public urlUploadProposal = this.baseUrl+'/api/appteam/uploadproposal';
	public urlAppsSubmission = this.baseUrl+'/api/appteam/submission';
	public urlAppsPayment = this.baseUrl+'/api/appteam/uploadpayment';

	/* HackToday */
	public urlHasRegistHack = this.baseUrl+'/api/hackteam/user';
	public urlRegistHack = this.baseUrl+'/api/hackteam/create';
	public urlRegistHackMember = this.baseUrl+'/api/hackteam/registermember';
	public urlUploadWriteUp = this.baseUrl+'/api/hackteam/uploadwriteup';

	/* Seminar */
	public urlHasRegistSeminar = this.baseUrl+'/api/seminar/user';
	public urlRegistSeminar = this.baseUrl+'/api/seminar/register';
	public urlAttendSeminar = this.baseUrl+'/api/seminar/attend';

	loginAnnounced$ = this.isLoggedIn.asObservable();

	constructor(public http: Http){}

	public loginState(state){
			this.isLoggedIn.next(state);
	}

	public getData(){
		return this.http.get('assets/data/data.json').map(res => res.json()).catch(err => Observable.throw(err.json().error || 'Error'))
	}

}