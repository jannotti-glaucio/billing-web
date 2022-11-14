import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealerStatementReportComponent } from './dealer-statement-report.component';

const routes: Routes = [
  {
    path: '',
    component: DealerStatementReportComponent,
    data: {
      title: 'Extrato de Empresa'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealerStatementReportRoutingModule { }
