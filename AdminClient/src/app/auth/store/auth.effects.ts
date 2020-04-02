import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { LoadingController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of, pipe } from 'rxjs';
import { delay, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import * as AuthActions from '../store/auth.actions';

@Injectable()
export class AuthEffects {
  loginRejected$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loginRejected),
    tap(() => this.router.navigateByUrl('/auth'))
  ), {dispatch: false});

  loginAttempt$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.loginAttempt),
      switchMap(
        action => of(this.storeJwt()).pipe(delay(2000), tap(() => this.redirectToHome()))
      )
    ));

  constructor(
    private actions$: Actions,
    private router: Router,
    // public loadingController: LoadingController
  ) {
  }

  /**
   * Store the JWT token and return success action to the store
   */
  private storeJwt = (): Action => {
    localStorage.setItem(environment.ACCESS_TOKEN, 'I AM A JWT TOKEN FEAR ME MORTAL!');

    // Use the below for testing failed authentication error message
    // return AuthActions.loginSuccessful({errorMessage: 'I HAVE DENIED YOU ACCESS MORTAL FEAR ME!'});

    return AuthActions.loginSuccessful();
  };

  private redirectToHome = () => {
    this.router.navigateByUrl('/home');
  };
}
