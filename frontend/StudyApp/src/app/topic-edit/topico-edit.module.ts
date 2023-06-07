import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopicoEditPage } from './topico-edit.page';

import { IonicModule } from '@ionic/angular';

import { TopicoEditPageRoutingModule } from './topico-edit-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopicoEditPageRoutingModule
  ],
  declarations: [TopicoEditPage]
})
export class TopicoEditPageModule {}
