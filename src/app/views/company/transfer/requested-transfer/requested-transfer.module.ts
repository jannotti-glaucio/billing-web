import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { RequestedTransferComponent } from './requested-transfer.component';
import { RequestedTransferRoutingModule } from './requested-transfer-routing.module';
import { BsDatepickerModule } from 'ngx-bootstrap';

import { SelectModule } from 'ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { TranslateModule } from '@ngx-translate/core';
import { UtilModule } from 'app/views/util';

@NgModule({
  imports: [
    CommonModule,
    RequestedTransferRoutingModule,
    FormsModule,
    ModalModule,
    NgxMaskModule.forRoot(),
    BsDatepickerModule,
    SelectModule,
    TranslateModule,
    UtilModule
  ],
  declarations: [ RequestedTransferComponent ]
})
export class RequestedTransferModule { }
