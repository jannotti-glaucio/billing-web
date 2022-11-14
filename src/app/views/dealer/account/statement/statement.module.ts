import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StatementComponent } from './statement.component';
import { StatementRoutingModule } from './statement-routing.module';

import { BsDatepickerModule, TooltipModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskModule } from 'ngx-mask';
import { TextMaskModule } from 'angular2-text-mask';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { UtilModule } from 'app/views/util';

@NgModule({
  imports: [
    CommonModule,
    StatementRoutingModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    NgxMaskModule.forRoot(),
    TextMaskModule,
    CurrencyMaskModule,
    TranslateModule,
    ModalModule,
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    UtilModule
    
  ],
  declarations: [ StatementComponent ]
})
export class StatementModule { }
