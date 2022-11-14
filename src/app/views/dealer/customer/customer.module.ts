//Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Component imports
import { CustomerComponent } from './customer.component';
import { CustomerRoutingModule } from './customer-routing.module';

//External libs imports
import { ModalModule } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskModule } from 'ngx-mask';
import { TooltipModule } from 'ngx-bootstrap';
import { UtilModule } from 'app/views/util';

@NgModule({
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ModalModule,
    TranslateModule,
    NgxMaskModule.forRoot(),
    TooltipModule.forRoot(),
    UtilModule
  ],
  declarations: [ CustomerComponent]
})
export class CustomerModule { }
