import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationComponent } from './application.component'; 

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Aplicações'
    },
    children: [
      {
        path: '',
        component: ApplicationComponent,
        data: {
          title: 'Aplicações'
        }
      },
      {
        path: 'new-application',
        loadChildren: './new-application/new-application.module#NewApplicationModule'
      },
      {
        path: 'update-application/:token',
        loadChildren: './update-application/update-application.module#UpdateApplicationModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
