import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankBilletComponent } from './bank-billet.component';

const routes: Routes = [
  {
    path: '',
    component: BankBilletComponent,
    data: {
      title: 'Boleto'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankBilletRoutingModule { }
