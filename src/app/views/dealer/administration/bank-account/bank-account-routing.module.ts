import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankAccountComponent } from './bank-account.component';

const routes: Routes = [
  {
    path: '',
    component: BankAccountComponent,
    data: {
      title: 'Contas Bancárias'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankAccountRoutingModule { }
