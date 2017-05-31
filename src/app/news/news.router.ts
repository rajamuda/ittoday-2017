import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './news.component';

const appRoutes: Routes = [
  { path: '', component: NewsComponent, pathMatch: 'full' }
]

export const Routing = RouterModule.forChild(appRoutes);
