import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HackTodayComponent } from './hacktoday.component';

import { Routing } from './hacktoday.router';

@NgModule({
	imports: [ Routing, CommonModule ],
	declarations: [ HackTodayComponent ]
})

export class HackTodayModule{
	
}