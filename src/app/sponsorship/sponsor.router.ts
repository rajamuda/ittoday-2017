import { Routes, RouterModule } from '@angular/router';
import { SponsorComponent } from './sponsor.component';

const appRoutes: Routes = [
	{ path: '', component: SponsorComponent, pathMatch: 'full' }
]

export const Routing = RouterModule.forChild(appRoutes);
