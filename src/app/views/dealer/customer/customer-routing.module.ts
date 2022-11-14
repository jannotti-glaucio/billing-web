import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerComponent } from './customer.component'; 

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Clientes'
    },
    children: [
      {
        path: '',
        component: CustomerComponent,
        data: {
          title: 'Clientes'
        }
      },
      {
        path: 'new-customer',
        loadChildren: './new-customer/new-customer.module#NewCustomerModule'
      },
      {
        path: 'update-customer/:token',
        loadChildren: './update-customer/update-customer.module#UpdateCustomerModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
