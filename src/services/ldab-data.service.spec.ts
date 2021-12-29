import { TestBed } from '@angular/core/testing';

import { LdabDataService } from './ldab-data.service';

describe('LdabDataService', () => {
  let service: LdabDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LdabDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
