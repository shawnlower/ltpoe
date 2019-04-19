import { TestBed } from '@angular/core/testing';

import { LtpService } from './ltp.service';

describe('LtpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LtpService = TestBed.get(LtpService);
    expect(service).toBeTruthy();
  });
});
