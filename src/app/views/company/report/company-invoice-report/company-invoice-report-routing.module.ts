import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyInvoiceReportComponent } from './company-invoice-report.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyInvoiceReportComponent,
    data: {
      title: 'Relatório de Faturas'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyInvoiceReportRoutingModule { }
