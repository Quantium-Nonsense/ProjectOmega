import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { provideMockStore } from '@ngrx/store/testing';

import { AuthGuard } from './auth.guard';
import createSpy = jasmine.createSpy;

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  const initialState = {};
  const jwtHelperService = jasmine.createSpyObj<JwtHelperService>('JwtHelperService', [
    'tokenGetter',
    'decodeToken',
    'isTokenExpired'
  ]);

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthGuard,
        {
          provide: JwtHelperService, useValue: jwtHelperService
        },
        provideMockStore({initialState})
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    authGuard = TestBed.inject(AuthGuard);
  });

  it('should activate if user can authenticate', () => {
    authGuard.isAuthenticated = createSpy(null, authGuard.isAuthenticated).and.returnValue(true);
    expect(authGuard.canActivate(null, null)).toEqual(true);
  });

  it('should fail as token is invalid token', () => {
    jwtHelperService.decodeToken.and.throwError('Invalid Token!');
    expect(authGuard.isAuthenticated()).toEqual(false);
    expect(authGuard.canActivate(null, null)).toEqual(false);
  });

  it('should fail as token is expired', () => {
    jwtHelperService.isTokenExpired.and.returnValue(true);
    jwtHelperService.decodeToken.and.returnValue({});
    expect(authGuard.isAuthenticated()).toEqual(false);
    expect(authGuard.canActivate(null, null)).toEqual(false);
  });
});
