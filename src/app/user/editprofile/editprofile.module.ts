import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EditProfileComponent } from './editprofile.component';

import { Routing } from './editprofile.router';

@NgModule({
	imports: [ Routing, CommonModule, FormsModule ],
	declarations: [ EditProfileComponent ]
})

export class EditProfileModule{
	
}