import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { OperatorComponent } from './operator.component';
import { OperatorRoutingModule } from './operator-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule,
    TooltipModule.forRoot(),
    OperatorRoutingModule
  ],
  declarations: [ OperatorComponent ]
})
export class OperatorModule { }
