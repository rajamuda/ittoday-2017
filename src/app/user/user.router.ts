import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
	{ path: '', children: [
		{ path: '', redirectTo: 'dashboard' },
		{ path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' }
	]}
]

export const Routing = RouterModule.forChild(appRoutes);
