import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatementComponent } from './statement.component';

const routes: Routes = [
  {
    path: '',
    component: StatementComponent,
    data: {
      title: 'Extrato'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatementRoutingModule { }
