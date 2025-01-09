import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiResponse, DataItem } from '../../model/interface';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data/data.service';
import { LoadingController } from '@ionic/angular'; // Yükleme kontrolörü ekle
import { SearchbarCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-table',
  templateUrl: './table.page.html',
  styleUrls: ['./table.page.scss'],
})
export class TablePage implements OnChanges, OnInit {
  tagsisDataItems: DataItem[] = [];
  arananItems: DataItem[] = [];
  loading: boolean = false; // Loading durumunu tutan değişken

  constructor(
    private router: Router,
    private dataService: DataService,
    private loadingController: LoadingController // Yükleme kontrolörünü ekle
  ) {}

  ngOnInit() {
    this.loadDataFromLocalStorage(); 
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tagsisDataItems']) {
      this.arananItems = this.tagsisDataItems; 
    }
  }

  async loadDataFromLocalStorage() {
    const loading = await this.loadingController.create({
      message: 'Yükleniyor...', // Yükleme mesajı
    });
    await loading.present(); // Yüklemeyi göster

    const storedData = localStorage.getItem('dataItems');
    if (storedData) {
      this.tagsisDataItems = JSON.parse(storedData);
      this.arananItems = JSON.parse(storedData); 
      console.log('Local storage\'dan veriler yüklendi:', this.tagsisDataItems);
    } else {
      console.log('Local storage\'da veri bulunamadı.');
    }

    loading.dismiss(); // Yüklemeyi kapat
  }

  filter(event: SearchbarCustomEvent) {
    const filterValue = event.detail.value?.toLocaleUpperCase('tr-TR') || '';
  
    const searchTerms = filterValue.split(' ');
  
    if (filterValue) {
      this.arananItems = this.tagsisDataItems.filter(item => 
        searchTerms.every(term =>
          item.FirmaAdi.toLocaleUpperCase('tr-TR').includes(term) || 
          item.Marka.toLocaleUpperCase('tr-TR').includes(term)
        )
      );
    } else {
      this.arananItems = this.tagsisDataItems; 
    }
  }
  
  goToResult(item: DataItem) {
    this.router.navigate(['/result'], {
      state: {
        FirmaAdi: item.FirmaAdi,
        UrunAdi: item.UrunAdi,
        Marka: item.Marka,
        Uygunsuzluk: item.Uygunsuzluk,
        DuyuruTarihi: item.DuyuruTarihi,
        FirmaIl: item.FirmaIl,
        FirmaIlce: item.FirmaIlce,
        UrunGrupAdi: item.UrunGrupAdi
      }
    });
  }
}
