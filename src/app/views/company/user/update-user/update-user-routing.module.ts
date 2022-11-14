import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateUserComponent } from './update-user.component';


const routes: Routes = [
  {
    path: '',
    component: UpdateUserComponent,
    data: {
      title: 'Atualizar Usuário'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateUserRoutingModule { }
