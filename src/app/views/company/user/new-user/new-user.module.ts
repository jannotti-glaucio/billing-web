import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NewUserComponent } from './new-user.component';
import { NewUserRoutingModule } from './new-user-routing.module';

import { TranslateModule } from '@ngx-translate/core';
import { ValidatorsModule } from '../../../validators.module';
import { SelectModule } from 'ng-select';
import { ModalModule } from 'ngx-bootstrap';
import { UtilModule } from 'app/views/util';

@NgModule({
  imports: [
    CommonModule,
    NewUserRoutingModule,
    FormsModule,
    TranslateModule,
    ValidatorsModule,
    SelectModule,
    ModalModule.forRoot(),
    UtilModule
  ],
  declarations: [NewUserComponent]
})
export class NewUserModule { }
