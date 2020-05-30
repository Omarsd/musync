import { TestBed } from '@angular/core/testing';

import { MensajeriaService } from './mensajeria.service';

describe('MensajeriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MensajeriaService = TestBed.get(MensajeriaService);
    expect(service).toBeTruthy();
  });
});
