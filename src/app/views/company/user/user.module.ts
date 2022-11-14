import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { NgxMaskModule } from 'ngx-mask';
import { TranslateModule } from '@ngx-translate/core';
import { SelectModule } from 'ng-select';
import { TooltipModule } from 'ngx-bootstrap';
import { UtilModule } from 'app/views/util';


@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    SelectModule,
    TranslateModule,
    NgxMaskModule.forRoot(),
    TooltipModule.forRoot(),
    UtilModule

  ],
  declarations: [ UserComponent ]
})
export class UserModule { }
