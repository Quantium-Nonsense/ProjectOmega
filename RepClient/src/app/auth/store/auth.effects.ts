import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as AuthActions from '../store/auth.actions';

@Injectable()
export class AuthEffects {
  loginRejected$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loginRejected),
    tap(() => this.router.navigateByUrl('/auth'))
  ), {dispatch: false});

  constructor(
    private actions$: Actions,
    private router: Router
  ) {
  }
}
