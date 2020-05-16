import { TestBed } from '@angular/core/testing';

import { ApiEndpointCreatorService } from './api-endpoint-creator.service';

describe('ApiEndpointCreatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiEndpointCreatorService = TestBed.get(ApiEndpointCreatorService);
    expect(service).toBeTruthy();
  });
});
