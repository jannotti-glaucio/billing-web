import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceExpirationComponent } from './invoice-expiration.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Faturas'
    },
    children: [
      {
        path: '',
        component: InvoiceExpirationComponent,
        data: {
          title: 'Faturas Pendentes'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
