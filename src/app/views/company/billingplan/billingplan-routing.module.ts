import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillingPlanComponent } from './billingplan.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Planos Tarifários'
    },
    children: [
      {
        path: '',
        component: BillingPlanComponent
      },
      {
        path: 'new-billingplan',
        loadChildren: './new-billingplan/new-billingplan.module#NewBillingPlanModule'
      },
      {
        path: 'update-billingplan/:token',
        loadChildren: './update-billingplan/update-billingplan.module#UpdateBillingPlanModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingPlanRoutingModule { }
