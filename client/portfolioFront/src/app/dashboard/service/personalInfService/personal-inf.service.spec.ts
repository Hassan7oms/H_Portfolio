import { TestBed } from '@angular/core/testing';

import { PersonalInfService } from './personal-inf.service';

describe('PersonalInfService', () => {
  let service: PersonalInfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalInfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
