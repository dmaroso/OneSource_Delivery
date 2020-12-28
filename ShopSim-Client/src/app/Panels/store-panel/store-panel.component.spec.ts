import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePanelComponent } from './store-panel.component';

describe('StorePanelComponent', () => {
  let component: StorePanelComponent;
  let fixture: ComponentFixture<StorePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
