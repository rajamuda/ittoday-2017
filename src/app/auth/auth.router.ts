import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
	{ path: '', children: [
		{ path: '', redirectTo: 'user' },
		{ path: 'user', loadChildren: './user/user.module#UserModule' }
	]}
]

export const Routing = RouterModule.forChild(appRoutes);
