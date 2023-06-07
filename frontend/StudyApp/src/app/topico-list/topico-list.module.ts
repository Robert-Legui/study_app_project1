import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopicoListPage } from './topico-list.page';

import { IonicModule } from '@ionic/angular';

import { TopicoListPageRoutingModule } from './topico-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopicoListPageRoutingModule
  ],
  declarations: [TopicoListPage]
})
export class TopicoListPageModule {}
