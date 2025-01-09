import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data/data.service'; 
import { DataItem } from '../app/model/interface';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  
  dataItems: DataItem[] = []; 
  data: any;


  constructor(private router: Router, private dataService: DataService) { }
  ngOnInit() {
    this.fetchData();
    this.saveLocalStorage();
  }

  fetchData() {
    this.dataService.sendPostRequest().subscribe({
      next: (res) => {
        this.dataItems = res.data; 
        console.log('Veriler başarıyla çekildi:', this.dataItems);
        localStorage.setItem('dataItems', JSON.stringify(res.data)); 
      },
      error: (err) => {
        console.error('Hata: Verileri çekerken bir sorun oluştu:', err);
      }
    });

    // this.dataService.getData().subscribe(
    //   response => {
    //     this.data = response;
    //     console.log(this.data);
    //   },
    //   error => {
    //     console.error('Hata:', error);
    //   }
    // );
    
  }


  saveLocalStorage() {
    const storedData = localStorage.getItem('dataItems');
    if (storedData) {
      const dataItems: DataItem[] = JSON.parse(storedData);
      console.log('Data from local storage:');
      console.log(dataItems)

      dataItems.forEach(item => {
        console.log({
          DuyuruTarihi: this.convertDotNetDate(item.DuyuruTarihi),
          FirmaAdi: item.FirmaAdi,
          Marka: item.Marka,
          UrunAdi: item.UrunAdi,
          Uygunsuzluk: item.Uygunsuzluk,
          FirmaIl: item.FirmaIl,
          FirmaIlce : item.FirmaIlce,
          UrunGrupAdi: item.UrunGrupAdi

        });
      });
    } else {
      console.log('No data found in local storage.');
    }
  }


  
  private convertDotNetDate(dateString: string): Date | null {
    const regex = /\/Date\((\d+)\)\//;
    const match = regex.exec(dateString);
    if (match) {
      return new Date(parseInt(match[1], 10));
    }
    return null;
  }


}




//C:\gida_tarim\my_proxy_api --> backend file