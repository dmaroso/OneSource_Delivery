import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrderPagesComponent } from './view-order-pages.component';

describe('ViewOrderPagesComponent', () => {
  let component: ViewOrderPagesComponent;
  let fixture: ComponentFixture<ViewOrderPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOrderPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrderPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
