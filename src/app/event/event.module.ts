import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventComponent } from './event.component';

import { Routing } from './event.router';

@NgModule({
	imports: [ Routing, CommonModule ],
	declarations: [ EventComponent ]
})

export class EventModule{
	
}
