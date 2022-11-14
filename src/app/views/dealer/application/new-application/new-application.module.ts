import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NewApplicationComponent } from './new-application.component';
import { NewApplicationRoutingModule } from './new-application-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { UtilModule } from 'app/views/util';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ClipboardModule } from 'ngx-clipboard';


@NgModule({
  imports: [
    CommonModule,
    NewApplicationRoutingModule,
    FormsModule,
    TranslateModule,
    UtilModule,
    ModalModule.forRoot(),
    ClipboardModule
  ],
  declarations: [NewApplicationComponent]
})
export class NewApplicationModule { }
