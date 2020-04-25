import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';
import { delay, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import * as AuthActions from '../store/auth.actions';
import { UserModel } from '../../shared/model/auth/user.model';
import { ApiEndpointCreatorService } from '../../services/api-endpoint-creator.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthEffects {
  loginRejected$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.loginRejected),
      tap(() => this.router.navigateByUrl('/auth'))
  ), {dispatch: false});

  loginAttempt$ = createEffect(
      () => this.actions$.pipe(
          ofType(AuthActions.loginAttempt),
          switchMap((action: Action & { user }) => this.attemptLogin(action.user))
      ));

  constructor(
      private http: HttpClient,
      private apiEndPoints: ApiEndpointCreatorService,
      private actions$: Actions,
      private router: Router
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

  private attemptLogin(user: UserModel) {
    return this.http.post<{token: string}>(this.apiEndPoints.loginEndPoint)
  }
}
