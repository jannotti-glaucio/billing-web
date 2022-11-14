import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateApplicationComponent } from './update-application.component';


const routes: Routes = [
  {
    path: '',
    component: UpdateApplicationComponent,
    data: {
      title: 'Atualizar Cliente'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateApplicationRoutingModule { }
