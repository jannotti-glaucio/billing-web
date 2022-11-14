import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewOperatorComponent } from './new-operator.component';


const routes: Routes = [
  {
    path: '',
    component: NewOperatorComponent,
    data: {
      title: 'New Operator'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewOperatorRoutingModule { }
