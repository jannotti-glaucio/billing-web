import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NewBillingPlanComponent } from './new-billingplan.component';
import { NewBillingPlanRoutingModule } from './new-billingplan-routing.module';

import { TranslateModule } from '@ngx-translate/core';
import { ValidatorsModule } from '../../../validators.module';
import { SelectModule } from 'ng-select';
import { ModalModule } from 'ngx-bootstrap';
import { UtilModule } from 'app/views/util';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  imports: [
    CommonModule,
    NewBillingPlanRoutingModule,
    FormsModule,
    TranslateModule,
    ValidatorsModule,
    SelectModule,
    ModalModule.forRoot(),
    UtilModule,
    CurrencyMaskModule
  ],
  declarations: [NewBillingPlanComponent]
})
export class NewBillingPlanModule { }
