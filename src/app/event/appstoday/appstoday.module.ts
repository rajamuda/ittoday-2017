import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppsTodayComponent } from './appstoday.component';

import { Routing } from './appstoday.router';

@NgModule({
	imports: [ Routing, CommonModule ],
	declarations: [ AppsTodayComponent ]
})

export class AppsTodayModule{
	
}