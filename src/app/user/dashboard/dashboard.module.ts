import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';

import { Routing } from './dashboard.router';

@NgModule({
	imports: [ Routing, CommonModule, FormsModule ],
	declarations: [ DashboardComponent ]
})

export class DashboardModule{
	
}