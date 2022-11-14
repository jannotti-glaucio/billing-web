import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewUserComponent } from './new-user.component';


const routes: Routes = [
  {
    path: '',
    component: NewUserComponent,
    data: {
      title: 'Novo Usuário'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewUserRoutingModule { }
