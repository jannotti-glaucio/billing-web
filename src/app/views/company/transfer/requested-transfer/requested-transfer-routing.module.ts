import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestedTransferComponent } from './requested-transfer.component';

const routes: Routes = [
  {
    path: '',
    component: RequestedTransferComponent,
    data: {
      title: 'Transferências Pendentes'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestedTransferRoutingModule { }
