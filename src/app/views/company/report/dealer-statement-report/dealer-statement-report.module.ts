import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DealerStatementReportComponent } from './dealer-statement-report.component';
import { DealerStatementReportRoutingModule } from './dealer-statement-report-routing.module';
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
    DealerStatementReportRoutingModule,
    UtilModule
  ],
  declarations: [ DealerStatementReportComponent ]
})
export class DealerStatementReportModule { }
