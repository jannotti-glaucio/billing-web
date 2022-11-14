import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Transferências'
    },
    children: [
      {
        path: 'manage-transfer',
        loadChildren: './manage-transfer/manage-transfer.module#ManageTransferModule'
      },
      {
        path: 'requested-transfer',
        loadChildren: './requested-transfer/requested-transfer.module#RequestedTransferModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferRoutingModule { }
