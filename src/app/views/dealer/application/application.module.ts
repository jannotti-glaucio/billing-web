//Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Component imports
import { ApplicationComponent } from './application.component';
import { ApplicationRoutingModule } from './application-routing.module';

//External libs imports
import { ModalModule } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from 'ngx-bootstrap';
import { UtilModule } from 'app/views/util';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    FormsModule,
    TranslateModule,
    TooltipModule.forRoot(),
    UtilModule,
    ModalModule.forRoot(),
    ClipboardModule
  ],
  declarations: [ ApplicationComponent]
})
export class ApplicationModule { }
