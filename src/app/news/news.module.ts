import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NewsComponent } from './news.component';

import { Routing } from './news.router';

@NgModule({
  imports: [ Routing, CommonModule, FormsModule ],
  declarations: [ NewsComponent ]
})

export class NewsModule{
  
}
