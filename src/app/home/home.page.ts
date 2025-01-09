import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Ocr, TextDetections } from '@capacitor-community/image-to-text';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  textDetections: any[] = [];
  constructor() {}

  async scanNow() {
    const photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });

    const data: TextDetections = await Ocr.detectText({
      filename: photo.path!,
    });

    console.log(data);

    this.textDetections = data.textDetections;
    console.log(this.textDetections);

    // for (let detection of data.textDetections) {
    //   console.log(detection.text);
    // }
  }
}