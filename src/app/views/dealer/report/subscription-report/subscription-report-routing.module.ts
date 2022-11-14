import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscriptionReportComponent } from './subscription-report.component';


const routes: Routes = [
  {
    path: '',
    component: SubscriptionReportComponent,
    data: {
      title: 'Relatório de Assinaturas'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionReportRoutingModule { }
