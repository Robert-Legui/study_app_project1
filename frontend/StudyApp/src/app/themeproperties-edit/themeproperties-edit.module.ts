import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemePropertiesEditPage } from './themeproperties-edit.page';

import { IonicModule } from '@ionic/angular';

import { ThemePropertiesEditPageRoutingModule } from './themeproperties-edit-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThemePropertiesEditPageRoutingModule
  ],
  declarations: [ThemePropertiesEditPage]
})
export class ThemePropertiesEditPageModule {}
