import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionComponent } from './collection.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Cobrança'
    },
    children: [
      {
        path: '',
        component: CollectionComponent,
        data: {
          title: 'Parcelamentos'
        }
      },
      {
        path: 'new-collection',
        loadChildren: './new-collection/new-collection.module#NewCollectionModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionRoutingModule { }
