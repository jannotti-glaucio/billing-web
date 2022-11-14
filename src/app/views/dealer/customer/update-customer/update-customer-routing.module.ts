import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateCustomerComponent } from './update-customer.component';


const routes: Routes = [
  {
    path: '',
    component: UpdateCustomerComponent,
    data: {
      title: 'Atualizar Cliente'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateCustomerRoutingModule { }
