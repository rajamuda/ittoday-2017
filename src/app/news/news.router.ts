import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './news.component';
import { ViewComponent } from './view/view.component';

const appRoutes: Routes = [
  { path: '', component: NewsComponent, pathMatch: 'full' },
  { path: ':id', component: ViewComponent }
]

export const Routing = RouterModule.forChild(appRoutes);
