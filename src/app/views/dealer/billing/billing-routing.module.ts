import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'invoice',
        loadChildren: './invoice/invoice.module#InvoiceModule'
      },
      {
        path: 'collection',
        loadChildren: './collection/collection.module#CollectionModule'
      },
      {
        path: 'invoice-expiration',
        loadChildren: './invoice-expiration/invoice-expiration.module#InvoiceExpirationModule'
      },
      {
        path: 'subscription',
        loadChildren: './subscription/subscription.module#SubscriptionModule'
      }      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingRoutingModule { }
