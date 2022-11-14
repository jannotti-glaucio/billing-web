import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { CompanyComponent } from './company.component';
import { CompanyRoutingModule } from './company-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CompanyRoutingModule,
    FormsModule,
    ModalModule
  ],
  declarations: [ CompanyComponent ]
})
export class CompanyModule { }
