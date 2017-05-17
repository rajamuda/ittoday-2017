import { Routes, RouterModule } from '@angular/router';
import { HackTodayComponent } from './hacktoday.component';

const appRoutes: Routes = [
	{ path: '', component: HackTodayComponent, pathMatch: 'full' }
]

export const Routing = RouterModule.forChild(appRoutes);