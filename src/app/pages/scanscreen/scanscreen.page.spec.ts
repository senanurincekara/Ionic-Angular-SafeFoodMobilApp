import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScanscreenPage } from './scanscreen.page';

describe('ScanscreenPage', () => {
  let component: ScanscreenPage;
  let fixture: ComponentFixture<ScanscreenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanscreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
