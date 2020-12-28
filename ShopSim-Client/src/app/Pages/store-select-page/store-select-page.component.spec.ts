import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreSelectPageComponent } from './store-select-page.component';

describe('StoreSelectPageComponent', () => {
  let component: StoreSelectPageComponent;
  let fixture: ComponentFixture<StoreSelectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreSelectPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreSelectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
