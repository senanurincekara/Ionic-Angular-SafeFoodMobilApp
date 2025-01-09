import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataItem } from '../../model/interface';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Ocr, TextDetections } from '@capacitor-community/image-to-text';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-scanscreen',
  templateUrl: './scanscreen.page.html',
  styleUrls: ['./scanscreen.page.scss'],
})

export class ScanscreenPage implements OnInit {
  dataItems: DataItem[] = []; 
  textDetections: any[] = []; 

  constructor(
    private router: Router, 
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadDataFromLocalStorage(); 
    this.scanNow(); 
  }

  loadDataFromLocalStorage() {
    const storedData = localStorage.getItem('dataItems');
    if (storedData) {
      this.dataItems = JSON.parse(storedData);
      console.log('Local storage\'dan veriler yüklendi:', this.dataItems);
    } else {
      console.log('Local storage\'da veri bulunamadı.');
    }
  }

  async scanNow() {

    
    try {
      const photo = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });

      const data: TextDetections = await Ocr.detectText({
        filename: photo.path!,
      });

      console.log(data);
      this.textDetections = data.textDetections;

      console.log("textDetections veriler -->", this.textDetections);
      await this.kontrolData2(this.textDetections);
      
    } catch (error) {
      console.error('Kamera kullanılamadı veya tarama başarısız oldu:', error);
      const alert = await this.alertController.create({
        header: 'Kamera hatası',
        subHeader: 'Kamerayı kullanırken bir hata oluştu.',
        buttons: ['Tamam'],
        cssClass: 'my-custom-class'
      });

      await alert.present();

      this.router.navigate(['/main']); 
    }
  }

  async kontrolData2(textDetections: any[]) {
    const matchedIndexes: number[] = [];
    
    const upperFunc = (text: string): string => {
      return text.toLocaleUpperCase('tr-TR'); 
    };
    
    if (!textDetections || textDetections.length === 0) {
      const alert = await this.alertController.create({
        header: 'Yazı Tespit Edilmedi',
        subHeader: 'Lütfen tekrar deneyiniz',
        buttons: ['Tamam'],
        cssClass: 'my-custom-class'
      });

      await alert.present();
      this.router.navigate(['/main'],)
    } else {
      this.dataItems.forEach((item, index) => {
        textDetections.forEach(detection => {
          const detectedText = detection.text?.toLowerCase(); 
          if (!detectedText) return;

          if (
            upperFunc(item.FirmaAdi) === upperFunc(detectedText) || 
            upperFunc(item.Marka) === upperFunc(detectedText)
          ) {
            if (!matchedIndexes.includes(index)) {
              matchedIndexes.push(index); 
            }
          }
        });
      });

      if (matchedIndexes.length > 0) {
        console.log('Eşleşen Verilerin İndeksleri:', matchedIndexes);
        
        this.router.navigate(['/result2'], {
          state: {
            matchedIndexes: matchedIndexes,
            textDetections: textDetections
          }
        });
      } else {
        console.log('Eşleşen ürün bulunamadı.');

        const alert = await this.alertController.create({
          header: 'Eşleşen ürün bulunamadı',
          subHeader: 'Tağşiş tablosu içerisinde ilgili ürüne ait bir eşleşme bulunmadı',
          buttons: ['Tamam'],
          cssClass: 'my-custom-class'
        });

        await alert.present();
        this.router.navigate(['/result2'], {
          state: {
            matchedIndexes: matchedIndexes,
            textDetections: textDetections
          }
        });
      }
    }
  }
}
