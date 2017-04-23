import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
	{ path: '', children: [
		{ path: '', redirectTo: 'login' },
		{ path: 'login', loadChildren: './login/login.module#UserModule' }
	]}
]

export const Routing = RouterModule.forChild(appRoutes);
