import { Component } from '@angular/core';

import { MenuController,NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {


  constructor(
    private menu: MenuController,
    public navCtrl: NavController
   ) {
 
  }

  goToThePage(pageName:string) 
  {
    this.navCtrl.navigateForward(`/${pageName}`);
    this.menu.close();
  }
  
}
