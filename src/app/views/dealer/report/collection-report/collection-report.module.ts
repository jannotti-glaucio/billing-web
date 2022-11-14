import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';


import { CollectionReportComponent } from './collection-report.component';
import { CollectionReportRoutingModule } from './collection-report-routing.module';
import { NgxMaskModule } from 'ngx-mask';
import { TranslateModule } from '@ngx-translate/core';
import { UtilModule } from 'app/views/util';

@NgModule({
  imports: [
    CommonModule,
    CollectionReportRoutingModule,
    BsDatepickerModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    TranslateModule,
    UtilModule
  ],
  declarations: [CollectionReportComponent]
})
export class CollectionReportModule { }
