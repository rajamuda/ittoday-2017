import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  { path: 'user', loadChildren: './user/user.module#UserModule'},
  { path: 'event', loadChildren: './event/event.module#EventModule'},
  { path: 'news', loadChildren: './news/news.module#NewsModule'},
  { path: 'sponsorship', loadChildren: './sponsorship/sponsor.module#SponsorModule'},
  { path: '**',    component: NoContentComponent },
];
