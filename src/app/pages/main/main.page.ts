import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data/data.service';

import { ApiResponse } from '../../model/interface'
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {


  // heading: string | null = '';
  // content: string | null = '';

  constructor(private dataService: DataService,
    private menu: MenuController
  ) { }

  ngOnInit() {
    this.fetchData();
    // this.logLocalStorage(); 
    
  }


  openMenu() {
    this.menu.open('first').then(() => {
      console.log('Menü başarıyla açıldı.');
    }).catch(error => {
      console.error('Menü açılırken bir hata oluştu: ', error);
    });
  }
  
  fetchData() {
    // this.dataService.sendPostRequest().subscribe({
    //   next: (res: ApiResponse) => {
    //     console.log(res);
    //     // localStorage.setItem('dataItems', JSON.stringify(res.data));

    //   },
    //   error: (err) => {
    //     console.error('Error fetching data', err);
    //   }
    // });


  }




 
}
