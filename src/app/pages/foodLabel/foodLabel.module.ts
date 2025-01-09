import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodLabelPageRoutingModule } from './foodLabel-routing.module';

import { FoodLabelPage } from './foodLabel.page';
import { CustomselectComponent } from 'src/app/components/customselect/customselect.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodLabelPageRoutingModule,
    CustomselectComponent
  ],
  declarations: [FoodLabelPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class FoodLabelPageModule {}
