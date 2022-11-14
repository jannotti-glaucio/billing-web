import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewCollectionComponent } from './new-collection.component';


const routes: Routes = [
  {
    path: '',
    component: NewCollectionComponent,
    data: {
      title: 'Novo Parcelamento'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewCollectionRoutingModule { }
