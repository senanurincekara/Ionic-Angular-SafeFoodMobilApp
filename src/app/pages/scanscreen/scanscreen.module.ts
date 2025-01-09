import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanscreenPageRoutingModule } from './scanscreen-routing.module';

import { ScanscreenPage } from './scanscreen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanscreenPageRoutingModule
  ],
  declarations: [ScanscreenPage]
})
export class ScanscreenPageModule {}
