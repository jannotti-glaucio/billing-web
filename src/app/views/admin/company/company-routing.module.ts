import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyComponent } from './company.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Company'
    },
    children: [
      {
        path: '',
        component: CompanyComponent,
        data: {
          title: 'Company'
        }
      },
      {
        path: 'new-company',
        loadChildren: './new-company/new-company.module#NewCompanyModule'
      },
      {
        path: 'update-company/:id',
        loadChildren: './update-company/update-company.module#UpdateCompanyModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
