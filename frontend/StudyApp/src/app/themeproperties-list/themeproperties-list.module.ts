import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemePropertiesListPage } from './themeproperties-list.page';

import { IonicModule } from '@ionic/angular';

import { ThemePropertiesListPageRoutingModule } from './themeproperties-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThemePropertiesListPageRoutingModule
  ],
  declarations: [ThemePropertiesListPage]
})
export class ThemePropertiesListPageModule {}
