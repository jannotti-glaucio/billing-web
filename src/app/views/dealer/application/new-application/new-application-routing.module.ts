import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewApplicationComponent } from './new-application.component';


const routes: Routes = [
  {
    path: '',
    component: NewApplicationComponent,
    data: {
      title: 'Nova Aplicação'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewApplicationRoutingModule { }
