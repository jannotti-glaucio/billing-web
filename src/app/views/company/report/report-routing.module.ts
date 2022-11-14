import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Relatório'
    },
    children : [
      {
        path: 'company-invoice-report',
        loadChildren: './company-invoice-report/company-invoice-report.module#CompanyInvoiceReportModule'
      },
      {
        path: 'company-withdraw-report',
        loadChildren: './company-withdraw-report/company-withdraw-report.module#CompanyWithdrawReportModule'
      },
      {
        path: 'dealer-statement-report',
        loadChildren: './dealer-statement-report/dealer-statement-report.module#DealerStatementReportModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
