import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BankAccountComponent } from './bank-account.component'
import { BankAccountRoutingModule } from './bank-account-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule,
    BankAccountRoutingModule,
  ],
  declarations: [ BankAccountComponent ]
})
export class BankAccountModule { }
