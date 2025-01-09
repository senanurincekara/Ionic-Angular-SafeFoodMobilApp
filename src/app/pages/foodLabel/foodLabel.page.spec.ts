import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoodLabelPage } from './foodLabel.page';

describe('FoodLabelPage', () => {
  let component: FoodLabelPage;
  let fixture: ComponentFixture<FoodLabelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodLabelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
