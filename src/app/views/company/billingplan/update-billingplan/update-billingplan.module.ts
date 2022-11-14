import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UpdateBillingPlanComponent } from './update-billingplan.component';
import { UpdateBillingPlanRoutingModule } from './update-billingplan-routing.module';

import { NgxMaskModule } from 'ngx-mask';
import { TranslateModule } from '@ngx-translate/core';
import { ValidatorsModule } from '../../../validators.module';
import { UtilModule } from 'app/views/util';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  imports: [
    CommonModule,
    UpdateBillingPlanRoutingModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    TranslateModule,
    ValidatorsModule,
    UtilModule,
    CurrencyMaskModule
  ],
  declarations: [UpdateBillingPlanComponent]
})
export class UpdateBillingPlanModule { }
