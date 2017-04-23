import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class DataService{
	public token: string;
	public loginUrl: string;
	public userdata: any;
	public id_user: number;
	public isLoggedIn = new Subject<boolean>();

	public urlLogin = 'http://localhost:4200/login';

	loginAnnounced$ = this.isLoggedIn.asObservable();

	public loginState(state){
			this.isLoggedIn.next(state);
	}


}