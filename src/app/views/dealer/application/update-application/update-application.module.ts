import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UpdateApplicationComponent } from './update-application.component';
import { UpdateApplicationRoutingModule } from './update-application-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { UtilModule } from 'app/views/util';

@NgModule({
  imports: [
    CommonModule,
    UpdateApplicationRoutingModule,
    FormsModule,
    TranslateModule,
    UtilModule
  ],
  declarations: [UpdateApplicationComponent]
})
export class UpdateApplicationModule { }
