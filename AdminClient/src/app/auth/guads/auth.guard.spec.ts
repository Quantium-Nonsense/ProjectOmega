import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from '../../reducers';

import { AuthGuard } from './auth.guard';
import createSpy = jasmine.createSpy;

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  const initialState = {};

  beforeEach(() => {
    const jwtHelperService = jasmine.createSpyObj<JwtHelperService>('JwtHelperService', ['tokenGetter']);

    TestBed.configureTestingModule({
      imports: [

      ],
      providers: [
        AuthGuard,
        {
          provide: JwtHelperService, useValue: jwtHelperService
        },
        provideMockStore({initialState})
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    authGuard = TestBed.get(AuthGuard);
    authGuard.isAuthenticated = createSpy(null, authGuard.isAuthenticated).and.returnValue(true);
  });

  it('should activate if user can authenticate', () => {
    expect(authGuard.canActivate(null, null)).toEqual(true);
  });
});
