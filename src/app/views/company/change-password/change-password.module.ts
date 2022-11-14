import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChangePasswordComponent } from './change-password.component';
import { ChangePasswordRoutingModule } from './change-password-routing.module';
//Translate 
import { TranslateModule } from '@ngx-translate/core';
import { UtilModule } from 'app/views/util';

@NgModule({
  imports: [
    ChangePasswordRoutingModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    UtilModule
  ],
  declarations: [ ChangePasswordComponent]
})
export class ChangePasswordModule { }
