import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from '../../reducers';
import { TestModule } from '../../shared/test/test.module';

import { LoadingSpinnerService } from './loading-spinner.service';

describe('LoadingSpinnerService', () => {
  let service: LoadingSpinnerService;
  let mockStore: MockStore<State>;

  beforeEach(() => {
    // const mockOverlay = createMockOverlay();

    TestBed.configureTestingModule({
      imports: [
        TestModule,
      ],
      providers: [
        LoadingSpinnerService,
        provideMockStore({
          initialState: {
            auth: {
              errorMessage: null,
              loading: false,
              user: null
            }
          }
        }),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    service = TestBed.inject(LoadingSpinnerService);
    mockStore = TestBed.inject(MockStore);

    mockStore.refreshState();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should attach the spinner when calling showSpinner()', () => {
    service.showSpinner();
    // eslint-disable-next-line dot-notation
    expect(service['spinnerTopRef'].hasAttached()).toBeTruthy();
  });

  it('should detatch the spinner when calling stopSpinner()', () => {
    service.stopSpinner();

    // eslint-disable-next-line dot-notation
    expect(service['spinnerTopRef'].hasAttached()).toBeFalsy();
  });
});
