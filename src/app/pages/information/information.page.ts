import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DataService } from 'src/app/service/data/data.service';
import { ApiResponse2 } from 'src/app/model/interface';

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {
  items: { title: string; content: string }[] = []; 
  loading: boolean = false; // Loading durumunu tutan değişken

  constructor(private dataService: DataService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.fetchData();
  }

  async fetchData() {
    this.loading = true; // Loading göstergesini aç
    const loading = await this.loadingController.create({
      message: 'Yükleniyor...',
    });
    await loading.present(); // Loading'i göster

    this.dataService.sendPostRequest2().subscribe({
      next: (res: ApiResponse2[]) => { 
        console.log('API Response:', res); 
        this.items = res; 
        console.log('Items:', this.items); 
        loading.dismiss(); // Loading'i kapat
        this.loading = false; // Loading durumunu güncelle
      },
      error: (err) => {
        console.error('Error fetching data', err);
        loading.dismiss(); // Hata durumunda da loading'i kapat
        this.loading = false; // Loading durumunu güncelle
      }
    });
  }
}
