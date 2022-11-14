import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';


import { SubscriptionReportComponent } from './subscription-report.component';
import { SubscriptionReportRoutingModule } from './subscription-report-routing.module';
import { NgxMaskModule } from 'ngx-mask';
import { TranslateModule } from '@ngx-translate/core';
import { UtilModule } from 'app/views/util';

@NgModule({
  imports: [
    CommonModule,
    SubscriptionReportRoutingModule,
    BsDatepickerModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    TranslateModule,
    UtilModule
  ],
  declarations: [SubscriptionReportComponent]
})
export class SubscriptionReportModule { }
