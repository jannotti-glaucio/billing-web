import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealerComponent } from './dealer.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Empresas'
    },
    children: [
      {
        path: '',
        component: DealerComponent,
        data: {
          title: 'Empresas'
        }
      },
      {
        path: 'new-dealer',
        loadChildren: './new-dealer/new-dealer.module#NewDealerModule'
      },
      {
        path: 'update-dealer/:token',
        loadChildren: './update-dealer/update-dealer.module#UpdateDealerModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealerRoutingModule { }
