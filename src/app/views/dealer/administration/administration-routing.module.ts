import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'bank-billet',
        loadChildren: './bank-billet/bank-billet.module#BankBilletModule'
      },
      {
        path: 'bank-account',
        loadChildren: './bank-account/bank-account.module#BankAccountModule'
      },
      {
        path: 'registration',
        loadChildren: './registration/registration.module#RegistrationModule'
      }   
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
