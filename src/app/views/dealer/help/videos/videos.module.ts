import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VideosComponent } from './videos.component';
import { TranslateModule } from '@ngx-translate/core';
import { VideosRoutingModule } from './videos-routing.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    VideosRoutingModule,
    TranslateModule
  ],
  declarations: [ VideosComponent ]
})
export class VideosModule { }
