import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SponsorComponent } from './sponsor.component';

import { Routing } from './sponsor.router';

@NgModule({
	imports: [ Routing, CommonModule, FormsModule ],
	declarations: [ SponsorComponent ]
})

export class SponsorModule{
	
}
