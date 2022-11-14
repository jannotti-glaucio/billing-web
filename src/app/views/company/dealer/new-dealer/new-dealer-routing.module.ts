import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewDealerComponent } from './new-dealer.component';


const routes: Routes = [
  {
    path: '',
    component: NewDealerComponent,
    data: {
      title: 'Nova Empresa'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewDealerRoutingModule { }
