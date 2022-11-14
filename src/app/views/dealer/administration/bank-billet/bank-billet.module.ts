import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankBilletComponent } from './bank-billet.component';
import { BankBilletRoutingModule } from './bank-billet-routing.module';


@NgModule({
  imports: [
    CommonModule,
    BankBilletRoutingModule,
  ],
  declarations: [ BankBilletComponent ]
})
export class BankBilletModule { }
