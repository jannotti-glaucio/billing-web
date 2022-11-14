import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { P404Component } from './P404.component';

const routes: Routes = [
  {
    path: '',
    component: P404Component,
    data: {
      title: '404'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class P404RoutingModule { }
