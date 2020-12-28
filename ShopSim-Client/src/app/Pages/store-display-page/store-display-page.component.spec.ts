import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreDisplayPageComponent } from './store-display-page.component';


describe('StoreDisplayPageComponent', () => {
  let component: StoreDisplayPageComponent;
  let fixture: ComponentFixture<StoreDisplayPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreDisplayPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreDisplayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
