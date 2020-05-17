import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSpinner } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiEndpointCreatorService } from '../../services/api-endpoint-creator.service';
import { UserModel } from '../../shared/model/auth/user.model';
import { JwtToken } from '../../shared/model/dto/jwt-token';
import * as AuthActions from '../store/auth.actions';

@Injectable()
export class AuthEffects {
  spinnerRef: OverlayRef;

  successfulLogin$ = createEffect(
      () => this.actions$.pipe(
          ofType(AuthActions.loginSuccessful),
          tap(() => this.redirectToHome())
      ), {dispatch: false}
  );

  hideSpinner$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.hideSpinner),
      tap(() => this.hideSpinner())
  ), {dispatch: false});

  showSpinner$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.showSpinner),
      tap(() => this.presentSpinner())
  ), {dispatch: false});

  loginRejected$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.loginRejected),
      tap(() => {
        this.router.navigateByUrl('/auth');
      })
  ), {dispatch: false});

  loginAttempt$ = createEffect(
      () => this.actions$.pipe(
          ofType(AuthActions.loginAttempt),
          switchMap((action: Action & { email: string, password: string }) =>
              this.attemptLogin(action.email, action.password).pipe(
                  switchMap(httpResult =>
                    [this.handleTokenReturn(httpResult), AuthActions.loadingComplete()]),
                  catchError((error: HttpErrorResponse) => {
                    if (error.status === 404 || error.status === 500) {
                      return [
                        AuthActions.loginRejected({
                          errorMessage: environment.common.FAILED_LOGIN_SERVER
                        }),
                        AuthActions.loadingComplete()
                      ];
                    }

                    return [
                      AuthActions.loginRejected({
                        errorMessage: 'Wrong email or password, please try again'
                      }),
                      AuthActions.loadingComplete()
                    ];
                  })
              ))
      ));

  constructor(
      private overlay: Overlay,
      private jwtHelper: JwtHelperService,
      private http: HttpClient,
      private apiEndPoints: ApiEndpointCreatorService,
      private actions$: Actions,
      private router: Router
  ) {
  }

  attemptLogin(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.apiEndPoints.loginEndPoint, {
      email,
      password
    });
  }

  handleTokenReturn(httpResult: { token: string }): Action {
    const user = this.decodeToken(httpResult.token);

    return AuthActions.loginSuccessful({user});
  }

  decodeToken(token: string): UserModel {
    const user = new UserModel();
    const decodedToken: JwtToken = this.jwtHelper.decodeToken(JSON.stringify(token));
    localStorage.setItem(environment.ACCESS_TOKEN, JSON.stringify(token));

    user.id = decodedToken.id;
    user.roles = decodedToken.roles;
    user.email = decodedToken.email;

    return user;
  }

  presentSpinner(): void {
    this.spinnerRef = this.createSpinnerRef();
    this.spinnerRef.attach(new ComponentPortal(MatSpinner));
  }

  private redirectToHome = () => {
    this.router.navigateByUrl('/home');
  };

  private createSpinnerRef(): OverlayRef {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      positionStrategy: this.overlay.position()
                            .global()
                            .centerHorizontally()
                            .centerVertically()
    });
  }

  private hideSpinner(): void {
    if (this.spinnerRef) {
      this.spinnerRef.detach();
    }
  }
}
