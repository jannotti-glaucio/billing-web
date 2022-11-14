import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateDealerComponent } from './update-dealer.component';


const routes: Routes = [
  {
    path: '',
    component: UpdateDealerComponent,
    data: {
      title: 'Atualizar Empresa'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateDealerRoutingModule { }
