import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';
import { NewInvoiceComponent } from './new-invoice.component';
import { NewInvoiceRoutingModule } from './new-invoice-routing.module';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { TextMaskModule } from 'angular2-text-mask';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { ValidatorsModule } from '../../../../validators.module';
import { UtilModule } from 'app/views/util';

@NgModule({
  imports: [
    CommonModule,
    NewInvoiceRoutingModule,
    ValidatorsModule,
    FormsModule,
    ModalModule,
    TranslateModule,
    BsDatepickerModule.forRoot(),
    NgxMaskModule.forRoot(),
    TextMaskModule,
    CurrencyMaskModule,
    UtilModule
  ],
  declarations: [NewInvoiceComponent]
})
export class NewInvoiceModule { }
