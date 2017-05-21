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
	public urlLogin = 'http://localhost:4200/api/user/login';
	public urlRegister = 'http://localhost:4200/api/user/register';
	public urlSession = 'http://localhost:4200/api/user/session';
	public urlEditProfile = 'http://localhost:4200/api/user/editprofile';
	public urlShowProfile = 'http://localhost:4200/api/user/showprofile';

	loginAnnounced$ = this.isLoggedIn.asObservable();

	public loginState(state){
			this.isLoggedIn.next(state);
	}


}