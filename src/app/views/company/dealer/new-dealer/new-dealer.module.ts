import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NewDealerComponent } from './new-dealer.component';
import { NewDealerRoutingModule } from './new-dealer-routing.module';

import { NgxMaskModule } from 'ngx-mask';
import { TranslateModule } from '@ngx-translate/core';
import { ValidatorsModule } from '../../../validators.module';
import { UtilModule } from 'app/views/util';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  imports: [
    CommonModule,
    NewDealerRoutingModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    TranslateModule,
    ValidatorsModule,
    UtilModule,
    CurrencyMaskModule
  ],
  declarations: [NewDealerComponent]
})
export class NewDealerModule { }
