import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';

const appRoutes: Routes = [
	{ path: '', component: RegisterComponent, pathMatch: 'full' }
]

export const Routing = RouterModule.forChild(appRoutes);