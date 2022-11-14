import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewBillingPlanComponent } from './new-billingplan.component';


const routes: Routes = [
  {
    path: '',
    component: NewBillingPlanComponent,
    data: {
      title: 'Novo Plano Tarifário'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewBillingPlanRoutingModule { }
