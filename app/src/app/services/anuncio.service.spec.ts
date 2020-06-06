import { TestBed } from '@angular/core/testing';

import { AnunciosService } from './anuncio.service';

describe('AnunciosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnunciosService = TestBed.get(AnunciosService);
    expect(service).toBeTruthy();
  });
});
