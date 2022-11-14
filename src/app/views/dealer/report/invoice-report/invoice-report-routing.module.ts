import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceReportComponent } from './invoice-report.component';


const routes: Routes = [
  {
    path: '',
    component: InvoiceReportComponent,
    data: {
      title: 'Relatório de Faturas'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceReportRoutingModule { }
