import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShareTopicoEditPage } from './sharetopico-edit.page';

import { IonicModule } from '@ionic/angular';

import { ShareTopicoEditPageRoutingModule } from './sharetopico-edit-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareTopicoEditPageRoutingModule
  ],
  declarations: [ShareTopicoEditPage]
})
export class ShareTopicoEditPageModule {}
