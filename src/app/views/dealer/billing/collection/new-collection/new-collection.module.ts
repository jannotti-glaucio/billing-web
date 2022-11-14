import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { NewCollectionComponent } from './new-collection.component';
import { NewCollectionRoutingModule } from './new-collection-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { TextMaskModule } from 'angular2-text-mask';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { ValidatorsModule } from '../../../../validators.module';
import { UtilModule } from 'app/views/util';

@NgModule({
  imports: [
    CommonModule,
    NewCollectionRoutingModule,
    TranslateModule,
    ValidatorsModule,
    FormsModule,
    ModalModule,
    BsDatepickerModule,
    NgxMaskModule,
    TextMaskModule,
    CurrencyMaskModule,
    UtilModule
  ],
  declarations: [NewCollectionComponent]
})
export class NewCollectionModule { }
