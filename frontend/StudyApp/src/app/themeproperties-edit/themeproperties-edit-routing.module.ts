import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThemePropertiesEditPage } from './themeproperties-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ThemePropertiesEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThemePropertiesEditPageRoutingModule {}
