import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

const appRoutes: Routes = [
	{ path: '', component: LoginComponent, pathMatch: 'full' }
]

export const Routing = RouterModule.forChild(appRoutes);