import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ResetPassComponent } from './resetpass.component';

import { Routing } from './resetpass.router';

@NgModule({
	imports: [ Routing, CommonModule, FormsModule ],
	declarations: [ ResetPassComponent ]
})

export class ResetPassModule{
	
}