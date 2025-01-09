import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodLabelPage } from './foodLabel.page';

const routes: Routes = [
  {
    path: '',
    component: FoodLabelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodLabelPageRoutingModule {}
