import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscriptionComponent } from './subscription.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Subscriptions'
    },
    children: [
      {
        path: '',
        component: SubscriptionComponent,
        data: {
          title: 'Subscriptions'
        }
      },
      {
        path: 'new-subscription',
        loadChildren: './new-subscription/new-subscription.module#NewSubscriptionModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionRoutingModule { }
