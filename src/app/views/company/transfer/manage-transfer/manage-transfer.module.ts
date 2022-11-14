import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ManageTransferComponent } from './manage-transfer.component';
import { ManageTransferRoutingModule } from './manage-transfer-routing.module';
import { BsDatepickerModule } from 'ngx-bootstrap';

import { SelectModule } from 'ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { TranslateModule } from '@ngx-translate/core';
import { TextMaskModule } from 'angular2-text-mask';
import { UtilModule } from 'app/views/util';


@NgModule({
  imports: [
    CommonModule,
    ManageTransferRoutingModule,
    FormsModule,
    SelectModule,
    NgxMaskModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TranslateModule,
    TextMaskModule,
    UtilModule
    ],
  declarations: [ ManageTransferComponent ]
})
export class ManageTransferModule { }
