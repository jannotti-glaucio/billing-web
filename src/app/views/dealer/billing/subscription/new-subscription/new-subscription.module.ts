import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { NewSubscriptionComponent } from './new-subscription.component';
import { NewSubscriptionRoutingModule } from './new-subscription-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { TextMaskModule } from 'angular2-text-mask';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { ValidatorsModule } from '../../../../validators.module';
import { UtilModule } from '../../../../../views/util';

@NgModule({
  imports: [
    CommonModule,
    NewSubscriptionRoutingModule,
    TranslateModule,
    ValidatorsModule,
    FormsModule,
    ModalModule,
    BsDatepickerModule,
    NgxMaskModule,
    TextMaskModule,
    CurrencyMaskModule,
    UtilModule
  ],
  declarations: [NewSubscriptionComponent]
})
export class NewSubscriptionModule { }
