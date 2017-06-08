import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
	{ path: '', children: [
		{ path: '', redirectTo: 'login' },
		{ path: 'login', loadChildren: './login/login.module#LoginModule' },
		{ path: 'register', loadChildren: './register/register.module#RegisterModule' },
		{ path: 'resetpass', loadChildren: './resetpass/resetpass.module#ResetPassModule' }
	]}
]

export const Routing = RouterModule.forChild(appRoutes);
