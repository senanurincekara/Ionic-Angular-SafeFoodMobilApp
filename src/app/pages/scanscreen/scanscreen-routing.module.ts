import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanscreenPage } from './scanscreen.page';

const routes: Routes = [
  {
    path: '',
    component: ScanscreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanscreenPageRoutingModule {}
