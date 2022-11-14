import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionComponent } from './collection.component';
import { CollectionRoutingModule } from './collection-routing.module';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';

import { NgxMaskModule } from 'ngx-mask';
import { TextMaskModule } from 'angular2-text-mask';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { TranslateModule } from '@ngx-translate/core';
import { ValidatorsModule } from '../../../validators.module';
import { UtilModule } from 'app/views/util';



@NgModule({
  imports: [
    NgxMaskModule.forRoot(),
    TextMaskModule,
    ValidatorsModule,
    CurrencyMaskModule,
    CommonModule,
    CollectionRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule,
    TranslateModule,
    UtilModule
    ],
  declarations: [ CollectionComponent ]
})
export class CollectionModule { }
