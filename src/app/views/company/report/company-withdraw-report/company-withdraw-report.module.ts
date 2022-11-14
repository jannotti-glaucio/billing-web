import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyWithdrawReportComponent } from './company-withdraw-report.component';
import { CompanyWithdrawReportRoutingModule } from './company-withdraw-report-routing.module';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { TranslateModule } from '@ngx-translate/core';
import { SelectModule } from 'ng-select';
import { UtilModule } from 'app/views/util';

@NgModule({
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    NgxMaskModule.forRoot(),
    TranslateModule,
    SelectModule,
    CompanyWithdrawReportRoutingModule,
    UtilModule
  ],
  declarations: [ CompanyWithdrawReportComponent ]
})
export class CompanyWithdrawReportModule { }
