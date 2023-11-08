import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShareTopicoEditPage } from './sharetopico-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ShareTopicoEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShareTopicoEditPageRoutingModule {}
