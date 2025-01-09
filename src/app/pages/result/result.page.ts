import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  firmaAdi: string = '';
  urunAdi: string = '';
  marka: string = '';
  uygunsuzluk: string = '';
  duyuruTarihi: string = '';
  FirmaIl: string = '';
  FirmaIlce: string = '';
  UrunGrupAdi: string = '';

  constructor(
    private router: Router,
    private navControl:NavController
  ) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const state = navigation.extras.state;

      this.firmaAdi = state['FirmaAdi'] || '';
      this.urunAdi = state['UrunAdi'] || '';
      this.marka = state['Marka'] || '';
      this.uygunsuzluk = state['Uygunsuzluk'] || '';

      const duyuruTarihiDotNet = state['DuyuruTarihi'] || '';
      const duyuruTarihiDate = this.convertDotNetDate(duyuruTarihiDotNet);
      this.duyuruTarihi = this.formatDuyuruTarihi(duyuruTarihiDate);

      this.FirmaIl = state['FirmaIl'] || '';
      this.FirmaIlce = state['FirmaIlce'] || '';
      this.UrunGrupAdi = state['UrunGrupAdi'] || '';
    }
  }

  goBack(){
    this.navControl.back();
  }
  

  private convertDotNetDate(dateString: string): Date | null {
    const regex = /\/Date\((\d+)\)\//;
    const match = regex.exec(dateString);
    if (match) {
      return new Date(parseInt(match[1], 10));
    }
    return null;
  }

  private formatDuyuruTarihi(date: Date | null): string {
    if (date) {
      const day = date.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const time = date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
      return `${day} ${time}`;
    }
    return '';
  }


  goToDetailPage(marka: string , firmaAdi:string) {
    console.log("markaa-->",marka)
    console.log("firma adı -->",firmaAdi)
    this.router.navigate(['/products'], { queryParams: { FirmaMarka: marka , FirmaName:firmaAdi } });
  }
}
