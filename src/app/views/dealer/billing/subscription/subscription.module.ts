import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionComponent } from './subscription.component';
import { SubscriptionRoutingModule } from './subscription-routing.module';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';

import { NgxMaskModule } from 'ngx-mask';
import { TextMaskModule } from 'angular2-text-mask';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { TranslateModule } from '@ngx-translate/core';
import { ValidatorsModule } from '../../../validators.module';
import { UtilModule } from '../../../../../app/views/util';



@NgModule({
  imports: [
    NgxMaskModule.forRoot(),
    TextMaskModule,
    ValidatorsModule,
    CurrencyMaskModule,
    CommonModule,
    SubscriptionRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule,
    TranslateModule,
    UtilModule
    ],
  declarations: [ SubscriptionComponent ]
})
export class SubscriptionModule { }
