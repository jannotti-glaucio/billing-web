import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateCompanyComponent } from './update-company.component';


const routes: Routes = [
  {
    path: '',
    component: UpdateCompanyComponent,
    data: {
      title: 'Update Company'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateCompanyRoutingModule { }
