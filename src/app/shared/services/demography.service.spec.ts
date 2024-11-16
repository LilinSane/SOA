import { TestBed } from '@angular/core/testing';

import { DemographyService } from './demography.service';

describe('DemographyService', () => {
  let service: DemographyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemographyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
