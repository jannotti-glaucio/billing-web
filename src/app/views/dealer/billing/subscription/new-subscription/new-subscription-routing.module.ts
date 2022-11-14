import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewSubscriptionComponent } from './new-subscription.component';


const routes: Routes = [
  {
    path: '',
    component: NewSubscriptionComponent,
    data: {
      title: 'Nova Assinatura'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewSubscriptionRoutingModule { }
