import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BsDatepickerModule } from 'ngx-bootstrap';

import { InvoiceReportComponent } from './invoice-report.component';
import { InvoiceReportRoutingModule } from './invoice-report-routing.module';
import { NgxMaskModule } from 'ngx-mask';
import { TranslateModule } from '@ngx-translate/core';
import { UtilModule } from 'app/views/util';

@NgModule({
  imports: [
    CommonModule,
    InvoiceReportRoutingModule,
    BsDatepickerModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    TranslateModule,
    UtilModule
  ],
  declarations: [InvoiceReportComponent]
})
export class InvoiceReportModule { }
