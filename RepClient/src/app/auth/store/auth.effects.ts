import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSpinner } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoadingController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiEndpointCreatorService } from '../../services/api-endpoint-creator.service';
import { UserModel } from '../../shared/model/auth/user.model';
import { JwtToken } from '../../shared/model/dto/JwtToken';
import { PrivilegeModel } from '../../shared/model/dto/privilege.model';
import * as AuthActions from '../store/auth.actions';

@Injectable()
export class AuthEffects {
  spinnerRef: OverlayRef;

  hideSpinner$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.hideSpinner),
      tap(() => {
        if (this.spinnerRef) {
          this.spinnerRef.detach();
        }
      })
  ), {dispatch: false});

  showSpinner$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.showSpinner),
      tap(() => {
        this.spinnerRef = this.overlay.create({
          hasBackdrop: true,
          backdropClass: 'dark-backdrop',
          positionStrategy: this.overlay.position()
                                .global()
                                .centerHorizontally()
                                .centerVertically()
        });
        this.spinnerRef.attach(new ComponentPortal(MatSpinner));
      })
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
                  map(httpResult => this.handleTokenReturn(httpResult)),
                  catchError(error => of(AuthActions.loginRejected({errorMessage: 'Wrong email or password'})))
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

  private redirectToHome = () => {
    this.router.navigateByUrl('/home');
  };

  private attemptLogin(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.apiEndPoints.loginEndPoint, {
      email,
      password
    });
  }

  private handleTokenReturn(httpResult: { token: string }): Action {
    const user = new UserModel();
    const decodedToken: JwtToken = this.jwtHelper.decodeToken(JSON.stringify(httpResult.token));
    localStorage.setItem(environment.ACCESS_TOKEN, JSON.stringify(httpResult.token));

    return AuthActions.loginSuccessful();
  }
}
