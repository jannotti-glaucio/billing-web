import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NewCompanyComponent } from './new-company.component';
import { NewCompanyRoutingModule } from './new-company-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NewCompanyRoutingModule,
    FormsModule
  ],
  declarations: [NewCompanyComponent]
})
export class NewCompanyModule { }
