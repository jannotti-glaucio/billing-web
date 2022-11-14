import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NewCustomerComponent } from './new-customer.component';
import { NewCustomerRoutingModule } from './new-customer-routing.module';
import { NgxMaskModule } from 'ngx-mask';
import { TranslateModule } from '@ngx-translate/core';
import { ValidatorsModule } from '../../../validators.module';
import { UtilModule } from 'app/views/util';


@NgModule({
  imports: [
    CommonModule,
    ValidatorsModule,
    NewCustomerRoutingModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    TranslateModule,
    UtilModule
  ],
  declarations: [NewCustomerComponent]
})
export class NewCustomerModule { }
