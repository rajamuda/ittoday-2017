import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RegisterComponent } from './register.component';

import { Routing } from './register.router';

@NgModule({
	imports: [ Routing, CommonModule, FormsModule ],
	declarations: [ RegisterComponent ]
})

export class RegisterModule{
	
}