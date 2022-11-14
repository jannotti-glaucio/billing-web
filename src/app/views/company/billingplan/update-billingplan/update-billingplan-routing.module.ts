import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateBillingPlanComponent } from './update-billingplan.component';


const routes: Routes = [
  {
    path: '',
    component: UpdateBillingPlanComponent,
    data: {
      title: 'Atualizar Planos Tarifários'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateBillingPlanRoutingModule { }
