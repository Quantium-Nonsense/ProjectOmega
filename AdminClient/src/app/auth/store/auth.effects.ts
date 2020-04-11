import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { delay, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import * as AuthActions from '../store/auth.actions';
import { AuthState } from './auth.reducer';

@Injectable()
export class AuthEffects {

  loginRejected$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loginRejected),
    tap(() => this.router.navigateByUrl('/auth'))
  ), {dispatch: false});

  loginAttempt$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.loginAttempt),
      withLatestFrom(this.store$),
      switchMap(
        ([action, storeState] ) => of(this.storeJwt()).pipe(delay(2000), tap(() => this.redirectToPreviousUrl(storeState.returnUrl)))
      )
    ));

  constructor(
    private actions$: Actions,
    private router: Router,
    private store$: Store<AuthState>,
  ) {
  }

  /**
   * Store the JWT token and return success action to the store
   *
   * @returns an action saying login was successful
   */
  private storeJwt = (): Action => {
    localStorage.setItem(environment.ACCESS_TOKEN, 'I AM A JWT TOKEN FEAR ME MORTAL!');

    // Use the below for testing failed authentication error message
    // return AuthActions.loginSuccessful({errorMessage: 'I HAVE DENIED YOU ACCESS MORTAL FEAR ME!'});

    return AuthActions.loginSuccessful();
  };

  private redirectToPreviousUrl = (returnUrl: string) => {
    this.router.navigateByUrl(returnUrl);
  };
}
