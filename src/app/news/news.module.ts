import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NewsComponent } from './news.component';
import { ViewComponent } from './view/view.component';

import { TruncatePipe } from './truncate';

import { Routing } from './news.router';

@NgModule({
  imports: [ Routing, CommonModule, FormsModule, InfiniteScrollModule  ],
  declarations: [ NewsComponent, ViewComponent, TruncatePipe ]
})

export class NewsModule{
  
}
