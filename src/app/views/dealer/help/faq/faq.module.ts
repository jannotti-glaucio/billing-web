import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq.component';
import { TranslateModule } from '@ngx-translate/core';
import { FaqRoutingModule } from './faq-routing.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    FaqRoutingModule,
    TranslateModule
  ],
  declarations: [ FaqComponent ]
})
export class FaqModule { }
