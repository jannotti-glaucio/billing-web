import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionReportComponent } from './collection-report.component';


const routes: Routes = [
  {
    path: '',
    component: CollectionReportComponent,
    data: {
      title: 'Relatório de Parcelamentos'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionReportRoutingModule { }
