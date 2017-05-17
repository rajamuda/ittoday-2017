import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeminarComponent } from './seminar.component';

import { Routing } from './seminar.router';

@NgModule({
	imports: [ Routing, CommonModule ],
	declarations: [ SeminarComponent ]
})

export class SeminarModule{
	
}