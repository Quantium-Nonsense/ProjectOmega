import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of, pipe } from 'rxjs';
import { delay, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import * as AddCustomerActions from '../store/add-customer.actions';

@Injectable()
export class AddCustomerEffects {
  addRejected$ = createEffect(() => this.actions$.pipe(
    ofType(AddCustomerActions.addRejected),
    tap(() => this.router.navigateByUrl('/add-customer'))
  ), {dispatch: false});

  addAttempt$ = createEffect(
    () => this.actions$.pipe(
      ofType(AddCustomerActions.addAttempt),
      switchMap(
        action => of(this.storeJwt()).pipe(delay(2000), tap(() => this.redirectToHome()))
      )
    ));

  constructor(
    private actions$: Actions,
    private router: Router,
    public loadingController: LoadingController
  ) {
  }

  private storeJwt = (): Action => {
    localStorage.setItem(environment.ACCESS_TOKEN, 'I AM A JWT TOKEN FEAR ME MORTAL!');

    return AddCustomerActions.addSuccessful();
  };

  private redirectToHome = () => {
    this.router.navigateByUrl('/home');
  };
}
