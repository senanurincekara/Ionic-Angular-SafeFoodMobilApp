import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, SearchbarCustomEvent } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Item } from 'src/app/model/interface';

@Component({
  standalone: true,
  selector: 'app-customselect',
  templateUrl: './customselect.component.html',
  styleUrls: ['./customselect.component.scss'],
  imports: [CommonModule, IonicModule, FormsModule]
})
export class CustomselectComponent implements OnChanges, OnInit {
  
  @Input() data: Item[] = []; 
  @Input() multiple = false; 

  isOpen = false; 
  selected: Item[] = []; 
  filtered: Item[] = [];

  @Output() selectedChanged: EventEmitter<Item[]> = new EventEmitter();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.filtered = this.data; 
    }
  }

  ngOnInit() {
    console.log(this.data);
  }

  open() {
    this.isOpen = true;
  }

  cancel() {
    this.isOpen = false;
    this.data.forEach(item => item.selected = false);
  }

  select() {
    this.isOpen = false;
    this.itemSelected(); 
    console.log(this.selected);
  }

  resetSelection() {
    this.selected = [];
    this.data.forEach(item => item.selected = false);
    this.selectedChanged.emit(this.selected); 
  }

  itemSelected() {
    this.selected = this.data.filter(item => item.selected);
    if (!this.multiple) {
      this.selectedChanged.emit(this.selected);
    }
  }

  filter(event: SearchbarCustomEvent) {
    const filterValue = event.detail.value?.toLowerCase();
    if (filterValue) {
      this.filtered = this.data.filter(item => 
        item.text.toLowerCase().includes(filterValue) 
      );
    } else {
      this.filtered = this.data; 
    }
  }
}



