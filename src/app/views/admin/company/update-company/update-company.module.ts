import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UpdateCompanyComponent } from './update-company.component';
import { UpdateCompanyRoutingModule } from './update-company-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UpdateCompanyRoutingModule,
    FormsModule
  ],
  declarations: [UpdateCompanyComponent]
})
export class UpdateCompanyModule { }
