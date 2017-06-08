import { Routes, RouterModule } from '@angular/router';
import { ResetPassComponent } from './resetpass.component';

const appRoutes: Routes = [
	{ path: '', component: ResetPassComponent, pathMatch: 'full' }
]

export const Routing = RouterModule.forChild(appRoutes);