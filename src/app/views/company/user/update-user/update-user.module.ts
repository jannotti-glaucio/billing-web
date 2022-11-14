import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UpdateUserComponent } from './update-user.component';
import { UpdateUserRoutingModule } from './update-user-routing.module';

import { NgxMaskModule } from 'ngx-mask';
import { TranslateModule } from '@ngx-translate/core';
import { ValidatorsModule } from '../../../validators.module';
import { UtilModule } from 'app/views/util';

@NgModule({
  imports: [
    CommonModule,
    UpdateUserRoutingModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    TranslateModule,
    ValidatorsModule,
    UtilModule
  ],
  declarations: [UpdateUserComponent]
})
export class UpdateUserModule { }
