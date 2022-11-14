import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'statement',
        loadChildren: './statement/statement.module#StatementModule'
      },
      {
        path: 'withdraw',
        loadChildren: './withdraw/withdraw.module#WithdrawModule'
      }   
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
