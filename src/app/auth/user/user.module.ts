import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserComponent } from './user.component';

import { Routing } from './user.router';

@NgModule({
	imports: [ Routing, CommonModule, FormsModule ],
	declarations: [ UserComponent ]
})

export class UserModule{
	
}