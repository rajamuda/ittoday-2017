import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const appRoutes: Routes = [
	{ path: '', component: DashboardComponent, pathMatch: 'full' }
]

export const Routing = RouterModule.forChild(appRoutes);