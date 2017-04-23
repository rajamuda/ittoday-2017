import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';

import { Routing } from './login.router';

@NgModule({
	imports: [ Routing, CommonModule, FormsModule ],
	declarations: [ LoginComponent ]
})

export class UserModule{
	
}