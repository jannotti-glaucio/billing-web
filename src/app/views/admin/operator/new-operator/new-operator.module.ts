import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NewOperatorComponent } from './new-operator.component';
import { NewOperatorRoutingModule } from './new-operator-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NewOperatorRoutingModule,
    FormsModule
  ],
  declarations: [NewOperatorComponent]
})
export class NewOperatorModule { }
