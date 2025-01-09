import { Component, OnInit } from '@angular/core';
import { SearchbarCustomEvent } from '@ionic/angular';
import { Etiket, FoodEtiketData, Item } from 'src/app/model/interface';
import { DataService } from 'src/app/service/data/data.service';

@Component({
  selector: 'app-foodLabel',
  templateUrl: './foodLabel.page.html',
  styleUrls: ['./foodLabel.page.scss'],
})
export class FoodLabelPage implements OnInit {

  foodLabelData: any;
  foodEtiketData!: FoodEtiketData; 
  selectedFoodEtiketText: string = '0 items';

  etiketDataValues: Item[] = [];
  selectedFoodEtiketData: string[] = [];
  selectedEtiketDetails: Etiket[] = [];  

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getFoodLabelData().subscribe(data => {
      this.foodLabelData = data;
    });

    this.dataService.getFoodEtiketData().subscribe(data2 => {
      this.foodEtiketData = data2 as FoodEtiketData;
      console.log('Etiket verisi:', this.foodEtiketData);

      const categories = Object.keys(this.foodEtiketData) as Array<keyof FoodEtiketData>;
      categories.forEach(key => {
        const etiketItems = this.foodEtiketData[key];
        if (etiketItems) { 
          etiketItems.forEach((etiket: Etiket) => {
            this.etiketDataValues.push({
              text: etiket.isim,
              value: etiket.kod,
              kaynak: etiket.kaynak,
              kullanim_alani: etiket.kullanim_alani,
              kisa_tanim : etiket.kisa_tanim,
              zararlari:etiket.zararlari

            });
          });
        }
      });

      console.log('Etiket data values:', this.etiketDataValues);
    });
  }

  onEtiketSelected(selectedEtikets: string[]) {
    this.selectedFoodEtiketData = selectedEtikets;
    this.selectedEtiketDetails = this.foodEtiketData.antibiyotikler.filter(etiket => 
      selectedEtikets.includes(etiket.kod)
    );
    console.log('Seçilen Etiketler:', this.selectedEtiketDetails);
  }

  


  selectChanged(event: any){
    console.log(event)

  }
  // filter(event: SearchbarCustomEvent) {
  //   const query = event.detail.value?.toLowerCase() || ''; 
    
  // }
}





// import { Component, OnInit } from '@angular/core';
// import { DataService } from 'src/app/service/data/data.service';
// import { FoodEtiketData } from '../../model/interface';

// @Component({
//   selector: 'app-foodLabel',
//   templateUrl: './foodLabel.page.html',
//   styleUrls: ['./foodLabel.page.scss'],
// })
// export class FoodLabelPage implements OnInit {

//   foodLabelData: any;
//   foodEtiketData!: FoodEtiketData; 
//   selectedFoodEtiketText: string = '0 items';

//   constructor(private dataService: DataService) { }

//   ngOnInit(): void {
//     this.dataService.getFoodLabelData().subscribe(data => {
//       this.foodLabelData = data;
//     });

//     this.dataService.getFoodEtiketData().subscribe(data2 => {
//       this.foodEtiketData = data2 as FoodEtiketData;
//       console.log('Etiket verisi:', this.foodEtiketData);
//     });
//   }

//   handleSelectionChange(selectedEtikets: string[]) {
//     console.log('Seçilen Etiketler:', selectedEtikets);
//   }

//   foodEtiketSelectionChanged(selectedEtikets: string[]): void {
//     if (!Array.isArray(selectedEtikets)) {
//       console.error('Beklenmeyen tür:', selectedEtikets);
//       return;
//     }
//     console.log('Seçilen Etiketler:', selectedEtikets);
//     this.selectedFoodEtiketText = selectedEtikets.length > 0 ? `${selectedEtikets.length} items` : '0 items';
//   }
  
// }
