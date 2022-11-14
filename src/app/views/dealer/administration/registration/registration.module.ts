import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RegistrationComponent } from './registration.component';
import { RegistrationRoutingModule } from './registration-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RegistrationRoutingModule,
  ],
  declarations: [ RegistrationComponent ]
})
export class RegistrationModule { }
