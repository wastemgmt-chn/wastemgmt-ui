/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrderCollectionService } from './order-collection.service';

describe('Service: OrderCollection', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderCollectionService]
    });
  });

  it('should ...', inject([OrderCollectionService], (service: OrderCollectionService) => {
    expect(service).toBeTruthy();
  }));
});
