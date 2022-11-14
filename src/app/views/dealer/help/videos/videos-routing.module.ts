import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideosComponent } from './videos.component';

const routes: Routes = [
  {
    path: '',
    component: VideosComponent,
    data: {
      title: 'Videos'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideosRoutingModule {}
