import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConciliationComponent } from './conciliation.component';

const routes: Routes = [
  {
    path: '',
    component: ConciliationComponent,
    data: {
      title: 'Conciliação'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConciliationRoutingModule { }
