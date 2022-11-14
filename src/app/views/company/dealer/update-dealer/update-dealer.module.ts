import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UpdateDealerComponent } from './update-dealer.component';
import { UpdateDealerRoutingModule } from './update-dealer-routing.module';

import { NgxMaskModule } from 'ngx-mask';
import { TranslateModule } from '@ngx-translate/core';
import { ValidatorsModule } from '../../../validators.module';
import { UtilModule } from 'app/views/util';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  imports: [
    CommonModule,
    UpdateDealerRoutingModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    TranslateModule,
    ValidatorsModule,
    UtilModule,
    CurrencyMaskModule
  ],
  declarations: [UpdateDealerComponent]
})
export class UpdateDealerModule { }
