import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthComponent } from './auth.component';

import { Routing } from './auth.router';

@NgModule({
	imports: [ Routing, CommonModule ],
	declarations: [ AuthComponent ]
})

export class AuthModule{
	
}
