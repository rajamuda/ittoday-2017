import { Routes, RouterModule } from '@angular/router';
import { AppsTodayComponent } from './appstoday.component';

const appRoutes: Routes = [
	{ path: '', component: AppsTodayComponent, pathMatch: 'full' }
]

export const Routing = RouterModule.forChild(appRoutes);