import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopicoEditPage } from './topico-edit.page';

import { IonicModule } from '@ionic/angular';

import { TopicoEditPageRoutingModule } from './topico-edit-routing.module';
import { ColorPickerModule } from 'ngx-color-picker';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopicoEditPageRoutingModule,
    ColorPickerModule
  ],
  declarations: [TopicoEditPage]
})
export class TopicoEditPageModule {}
