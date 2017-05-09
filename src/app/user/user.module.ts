import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserComponent } from './user.component';

import { Routing } from './user.router';

@NgModule({
	imports: [ Routing, CommonModule ],
	declarations: [ UserComponent ]
})

export class UserModule{
	
}
