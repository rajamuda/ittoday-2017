import { Routes, RouterModule } from '@angular/router';
import { EditProfileComponent } from './editprofile.component';

const appRoutes: Routes = [
	{ path: '', component: EditProfileComponent, pathMatch: 'full' }
]

export const Routing = RouterModule.forChild(appRoutes);