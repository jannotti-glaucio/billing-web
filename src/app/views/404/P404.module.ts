import { NgModule } from '@angular/core';

import { P404Component } from './P404.component';
import { P404RoutingModule } from './P404-routing.module';

@NgModule({
  imports: [
    P404RoutingModule
  ],
  declarations: [ P404Component ]
})
export class P404Module { }
