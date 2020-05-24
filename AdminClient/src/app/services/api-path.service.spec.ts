import { TestBed } from '@angular/core/testing';

import { ApiPathService } from './api-path.service';

describe('ApiPathService', () => {
  let service: ApiPathService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
