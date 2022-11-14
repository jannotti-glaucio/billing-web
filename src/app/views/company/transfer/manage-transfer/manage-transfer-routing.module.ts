import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageTransferComponent } from './manage-transfer.component';

const routes: Routes = [
  {
    path: '',
    component: ManageTransferComponent,
    data: {
      title: 'Todas as Transferências'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageTransferRoutingModule { }
