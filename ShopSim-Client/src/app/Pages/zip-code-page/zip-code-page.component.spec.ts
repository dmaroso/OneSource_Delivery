import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipCodePageComponent } from './zip-code-page.component';

describe('ZipCodePageComponent', () => {
  let component: ZipCodePageComponent;
  let fixture: ComponentFixture<ZipCodePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZipCodePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipCodePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
