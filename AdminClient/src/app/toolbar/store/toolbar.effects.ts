import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { delay, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import * as fromApp from '../../reducers';
import * as ToolbarActions from './toolbar.actions';

@Injectable()
export class ToolbarEffects {

  beginProgressBar$ = createEffect(() => this.actions$.pipe(
    ofType(ToolbarActions.beginProgressBar),
    switchMap((action: Action) => of(ToolbarActions.progressBarShownSuccessfully()).pipe(delay(2000))),
  ));

  stopProgressBar$ = createEffect(() => this.actions$.pipe(
    ofType(ToolbarActions.stopProgressBar),
    switchMap((action: Action) => of(ToolbarActions.progressBarHiddenSuccessfully()).pipe(delay(2000))),
  ));

  constructor(
    private store: Store<fromApp.State>,
    private router: Router,
    private actions$: Actions,
  ) {
  }

  private handleLogout = (): Action => {
    localStorage.removeItem(environment.ACCESS_TOKEN);

    return ToolbarActions.logoutSuccessful();
  };

  logoutAttempt$ = createEffect(() => this.actions$.pipe(
    ofType(ToolbarActions.logoutAttempt),
    switchMap((action: Action) => of(this.handleLogout()).pipe(delay(2000),
      tap(() => this.router.navigateByUrl('/auth'))
    )),
  ), {dispatch: false});
}
