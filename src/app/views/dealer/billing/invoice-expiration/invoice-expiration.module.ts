//Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Component imports
import { InvoiceExpirationComponent } from './invoice-expiration.component';
import { InvoiceRoutingModule } from './invoice-expiration-routing.module';

//External libs imports
import { BsDatepickerModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskModule } from 'ngx-mask';
import { TextMaskModule } from 'angular2-text-mask';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { ValidatorsModule } from '../../../validators.module';
import { UtilModule } from 'app/views/util';




@NgModule({
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    ValidatorsModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TranslateModule,
    TextMaskModule,
    CurrencyMaskModule,
    UtilModule
  ],
  declarations: [ InvoiceExpirationComponent ]
})
export class InvoiceExpirationModule { }
