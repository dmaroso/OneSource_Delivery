import { TestBed } from '@angular/core/testing';

import { ItemRetreivalKrogerService } from './item-retreival-Kroger.service';

describe('ItemRetreivalService', () => {
  let service: ItemRetreivalKrogerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemRetreivalKrogerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
