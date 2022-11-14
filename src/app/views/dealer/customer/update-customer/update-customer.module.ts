import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UpdateCustomerComponent } from './update-customer.component';
import { UpdateCustomerRoutingModule } from './update-customer-routing.module';
import { NgxMaskModule } from 'ngx-mask';
import { TranslateModule } from '@ngx-translate/core';
import { ValidatorsModule } from '../../../validators.module';
import { UtilModule } from 'app/views/util';

@NgModule({
  imports: [
    CommonModule,
    ValidatorsModule,
    UpdateCustomerRoutingModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    TranslateModule,
    UtilModule
  ],
  declarations: [UpdateCustomerComponent]
})
export class UpdateCustomerModule { }
