import { TestBed } from '@angular/core/testing';
import { CreateItemListService } from './create-ItemList.service';

describe('CreateItemListService', () => {
  let service: CreateItemListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateItemListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
