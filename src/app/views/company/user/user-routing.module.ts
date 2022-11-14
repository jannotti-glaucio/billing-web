import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Usuários'
    },
    children: [
      {
        path: '',
        component: UserComponent
      },
      {
        path: 'new-user',
        loadChildren: './new-user/new-user.module#NewUserModule'
      },
      {
        path: 'update-user/:token',
        loadChildren: './update-user/update-user.module#UpdateUserModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
