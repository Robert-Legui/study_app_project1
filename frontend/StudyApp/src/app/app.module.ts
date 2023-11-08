import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
// import { Clipboard } from "@capacitor/clipboard";

@NgModule({
  declarations: [AppComponent],
  imports: [TooltipModule.forRoot(),BrowserModule, IonicModule.forRoot(), AppRoutingModule,ColorPickerModule],
  exports: [TooltipModule,ColorPickerModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
