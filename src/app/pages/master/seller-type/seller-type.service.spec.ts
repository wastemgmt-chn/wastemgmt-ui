/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SellerTypeService } from './seller-type.service';

describe('Service: SellerType', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SellerTypeService]
    });
  });

  it('should ...', inject([SellerTypeService], (service: SellerTypeService) => {
    expect(service).toBeTruthy();
  }));
});
