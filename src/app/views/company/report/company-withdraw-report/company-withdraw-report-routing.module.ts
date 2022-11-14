import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyWithdrawReportComponent } from './company-withdraw-report.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyWithdrawReportComponent,
    data: {
      title: 'Relatório de Transferências'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyWithdrawReportRoutingModule { }
