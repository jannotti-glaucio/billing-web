import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Relatório'
    },
    children: [
      {
        path: 'collection-report',
        loadChildren: './collection-report/collection-report.module#CollectionReportModule'
      },
      {
        path: 'invoice-report',
        loadChildren: './invoice-report/invoice-report.module#InvoiceReportModule'
      },
      {
        path: 'subscription-report',
        loadChildren: './subscription-report/subscription-report.module#SubscriptionReportModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
