import { TestBed } from '@angular/core/testing';

import { FiltrosService } from './filtros.service';

describe('FiltrosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FiltrosService = TestBed.get(FiltrosService);
    expect(service).toBeTruthy();
  });
});
