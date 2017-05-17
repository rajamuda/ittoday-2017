import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
	{ path: '', children: [
		{ path: '', redirectTo: 'appstoday' },
		{ path: 'appstoday', loadChildren: './appstoday/appstoday.module#AppsTodayModule' },
		{ path: 'hacktoday', loadChildren: './hacktoday/hacktoday.module#HackTodayModule' },	
		{ path: 'seminar', loadChildren: './seminar/seminar.module#SeminarModule' }
]}
]

export const Routing = RouterModule.forChild(appRoutes);
