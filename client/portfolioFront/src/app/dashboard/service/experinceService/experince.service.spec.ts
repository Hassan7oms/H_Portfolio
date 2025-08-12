import { TestBed } from '@angular/core/testing';

import { ExperinceService } from './experince.service';

describe('ExperinceService', () => {
  let service: ExperinceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExperinceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
