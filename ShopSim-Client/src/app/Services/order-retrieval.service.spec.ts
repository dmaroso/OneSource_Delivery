import { TestBed } from '@angular/core/testing';

import { OrderRetrievalService } from './order-retrieval.service';

describe('OrderRetrievalService', () => {
  let service: OrderRetrievalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderRetrievalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
