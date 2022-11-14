import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { DealerComponent } from './dealer.component';
import { DealerRoutingModule } from './dealer-routing.module';
import { NgxMaskModule } from 'ngx-mask';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from 'ngx-bootstrap';
import { UtilModule } from 'app/views/util';

@NgModule({
  imports: [
    CommonModule,
    DealerRoutingModule,
    FormsModule,
    ModalModule,
    TranslateModule,
    NgxMaskModule.forRoot(),
    TooltipModule.forRoot(),
    UtilModule
  ],
  declarations: [ DealerComponent ]
})
export class DealerModule { }
