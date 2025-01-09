import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Result2Page } from './result2.page';

describe('Result2Page', () => {
  let component: Result2Page;
  let fixture: ComponentFixture<Result2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Result2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
