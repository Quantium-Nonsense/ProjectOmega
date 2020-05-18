import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiPathService } from '../../services/api-path.service';
import * as ToolbarActions from '../../toolbar/store/toolbar.actions';
import * as AuthActions from '../store/auth.actions';

@Injectable()
export class AuthEffects {

  loginRejected$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.loginRejected),
      tap(() => this.router.navigateByUrl('/auth'))
  ), { dispatch: false });

  successfulAuthentication$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.loginSuccessful),
      map(() => {
        this.router.navigateByUrl('/dashboard');
      })
  ), { dispatch: false });

  loginAttempt$ = createEffect(
      () => this.actions$.pipe(
          ofType(AuthActions.loginAttempt),
          switchMap((action: Action & { email: string, password: string }) => {
            return this.login(action.email, action.password).pipe(
                switchMap((token: { token: string }) => {
                  return [
                    this.storeJwt(token),
                    ToolbarActions.stopProgressBar(),
                    AuthActions.loginSuccessful()
                  ];
                }),
                catchError((error: HttpErrorResponse) => {
                  if (error.status === 400 || error.status === 401) {
                    return [
                      AuthActions.hasError({ error: 'Wrong email or password please try again' }),
                      ToolbarActions.stopProgressBar()
                    ];
                  }
                  return [
                    AuthActions.hasError({ error: `Something went wrong ${ error.message }` }),
                    ToolbarActions.stopProgressBar()
                  ];
                })
            );
          })
      ));

  constructor(
      private actions$: Actions,
      private router: Router,
      private apiPath: ApiPathService,
      private http: HttpClient
  ) {
  }

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.apiPath.loginEndPoint, {
      email,
      password
    });
  }

  /**
   * Store the JWT token and return success action to the store
   *
   * @returns an action saying login was successful
   */
  private storeJwt = (token: { token: string }): Action => {
    localStorage.setItem(environment.ACCESS_TOKEN, token.token);

    return AuthActions.loginSuccessful();
  };
}
