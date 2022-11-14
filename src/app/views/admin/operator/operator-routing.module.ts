import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OperatorComponent } from './operator.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Operator'
    },
    children: [
      {
        path: '',
        component: OperatorComponent,
        data: {
          title: 'Operator'
        }
      },
      {
        path: 'new-operator',
        loadChildren: './new-operator/new-operator.module#NewOperatorModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperatorRoutingModule { }
