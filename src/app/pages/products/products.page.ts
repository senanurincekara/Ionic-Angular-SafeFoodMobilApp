import { Component, OnInit } from '@angular/core';
import { DataItem } from '../../model/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  localdataItems: DataItem[] = []; 
  firmaItems: DataItem[] = [];
  FirmaMarka: string = '';
  FirmaName: string = '';

  constructor(
    private navControl:NavController,

    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.loadDataFromLocalStorage(); 
    this.route.queryParams.subscribe(params => {
      this.FirmaMarka = params['FirmaMarka'] || ''; 
      this.FirmaName = params['FirmaName'] || ''; 
      this.filterFirmaItems();
    });
  }


  goBack(){
    this.navControl.back();
  }
  
  
  loadDataFromLocalStorage() {
    const storedData = localStorage.getItem('dataItems');
    if (storedData) {
      this.localdataItems = JSON.parse(storedData);
    }
  }

  filterFirmaItems() {
    if (this.FirmaMarka === '-') {
      this.firmaItems = this.localdataItems.filter(item => item.FirmaAdi === this.FirmaName);
    } else {
      this.firmaItems = this.localdataItems.filter(item => item.Marka === this.FirmaMarka);
    }
  }

  goToResultPage(item: DataItem) {
    this.router.navigate(['/result'], {
      state: {
        FirmaAdi: item.FirmaAdi,
        UrunAdi: item.UrunAdi,
        Marka: item.Marka,
        Uygunsuzluk: item.Uygunsuzluk,
        DuyuruTarihi: item.DuyuruTarihi,
        FirmaIl: item.FirmaIl,
        FirmaIlce: item.FirmaIlce,
        UrunGrupAdi: item.UrunGrupAdi,
      }
    });
  }
}
