import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
	{ path: '', children: [
		{ path: '', redirectTo: 'dashboard' },
		{ path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
		{ path: 'editprofile', loadChildren: './editprofile/editprofile.module#EditProfileModule' }
	]}
]

export const Routing = RouterModule.forChild(appRoutes);
