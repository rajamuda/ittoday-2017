import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';

const appRoutes: Routes = [
	{ path: '', component: UserComponent, pathMatch: 'full' }
]

export const Routing = RouterModule.forChild(appRoutes);