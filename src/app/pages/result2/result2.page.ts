import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data/data.service'; 
import { DataItem } from '../../model/interface';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-result2',
  templateUrl: './result2.page.html',
  styleUrls: ['./result2.page.scss'],
})
export class Result2Page implements OnInit {
  matchedIndexes: number[] = [];
  matchedItems: DataItem[] = [];
  dataItems: DataItem[] = [];

  textDetections: any[]=[];

  constructor(
    private router: Router, 
    private navControl:NavController) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.matchedIndexes = navigation.extras.state['matchedIndexes'];
      this.textDetections = navigation.extras.state['textDetections'];
    }
  }

  ngOnInit() {
    this.loadDataFromLocalStorage();
  }

  goBack(){
    this.navControl.back();
  }

  loadDataFromLocalStorage() {
    const storedData = localStorage.getItem('dataItems');
    if (storedData) {
      this.dataItems = JSON.parse(storedData);
      this.extractMatchedItems(); 
      console.log('Eşleşen Veriler:', this.matchedItems);
    } else {
      console.log('Local storage\'de veri bulunamadı.');
   
    }
  }

  extractMatchedItems() {
    this.matchedIndexes.forEach(index => {
      if (this.dataItems[index]) {
        this.matchedItems.push(this.dataItems[index]);
      }
    });
  }

  goToResultPage(matchedItem: DataItem) {
    this.router.navigate(['/result'], {
      state: {
        FirmaAdi: matchedItem.FirmaAdi,
        UrunAdi: matchedItem.UrunAdi,
        Marka: matchedItem.Marka,
        Uygunsuzluk: matchedItem.Uygunsuzluk,
        DuyuruTarihi: matchedItem.DuyuruTarihi,
        FirmaIl: matchedItem.FirmaIl,
        FirmaIlce: matchedItem.FirmaIlce,
        UrunGrupAdi: matchedItem.UrunGrupAdi
      }
    });
  }
}
