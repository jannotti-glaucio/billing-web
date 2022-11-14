import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewCompanyComponent } from './new-company.component';


const routes: Routes = [
  {
    path: '',
    component: NewCompanyComponent,
    data: {
      title: 'New Company'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewCompanyRoutingModule { }
