import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
//Translate 
import { TranslateModule } from '@ngx-translate/core';
// Alert Component
import { AlertModule } from 'ngx-bootstrap/alert';
import { UtilModule } from '../util';

@NgModule({
  imports: [
    LoginRoutingModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    AlertModule.forRoot(),
    UtilModule
  ],
  declarations: [ LoginComponent]
})
export class LoginModule { }
