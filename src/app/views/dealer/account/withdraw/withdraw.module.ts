import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDatepickerModule, TooltipModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';

import { WithdrawComponent } from './withdraw.component';
import { WithdrawRoutingModule } from './withdraw-routing.module';
import { NgxMaskModule } from 'ngx-mask';
import { TextMaskModule } from 'angular2-text-mask';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { TranslateModule } from '@ngx-translate/core';
import { UtilModule } from 'app/views/util';

@NgModule({
  imports: [
    CommonModule,
    BsDatepickerModule,
    FormsModule,
    ModalModule,
    WithdrawRoutingModule,
    BsDatepickerModule.forRoot(),
    NgxMaskModule.forRoot(),
    TextMaskModule,
    CurrencyMaskModule,
    TranslateModule,
    TooltipModule.forRoot(),
    UtilModule
  ],
  declarations: [ WithdrawComponent ]
})
export class WithdrawModule { }
