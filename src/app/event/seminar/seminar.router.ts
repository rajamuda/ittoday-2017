import { Routes, RouterModule } from '@angular/router';
import { SeminarComponent } from './seminar.component';

const appRoutes: Routes = [
	{ path: '', component: SeminarComponent, pathMatch: 'full' }
]

export const Routing = RouterModule.forChild(appRoutes);