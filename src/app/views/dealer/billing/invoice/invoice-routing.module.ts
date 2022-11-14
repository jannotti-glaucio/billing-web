import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceComponent } from './invoice.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Cobrança'
    },
    children: [
      {
        path: '',
        component: InvoiceComponent,
        data: {
          title: 'Faturas'
        }
      },
      {
        path: 'new-invoice',
        loadChildren: './new-invoice/new-invoice.module#NewInvoiceModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
