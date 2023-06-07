import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopicoListPage } from './topico-list.page';

const routes: Routes = [
  {
    path: '',
    component: TopicoListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopicoListPageRoutingModule {}
