import { TestBed } from '@angular/core/testing';

import { ItemRetreivalWalmartService } from './item-retreival-walmart.service';

describe('ItemRetreivalWalmartService', () => {
  let service: ItemRetreivalWalmartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemRetreivalWalmartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
