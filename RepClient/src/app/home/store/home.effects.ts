import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { CompanyModel } from '../../models/home/company.model';
import * as HomeActions from './home.actions';

@Injectable()
export class HomeEffects {
  dashboardBeginLoading$ = createEffect(
    () => this.actions$.pipe(
      ofType(HomeActions.beginLoadingDashboard),
      switchMap(
        action => of(this.getDummyCompanies()).pipe(delay(2000))
      )
    )
  );

  constructor(
    private actions$: Actions,
  ) {
  }

  /**
   * Create a list of 4 dummy companies for placeholders
   */
  private getDummyCompanies = (): Action => {
    const imageUrl = 'assets/shapes.svg';
    const companies: CompanyModel[] = [];

    for (let i = 0; i < 4; i++) {
      companies.push(new CompanyModel(`Company ${i}`, imageUrl, `Some fantastic company called ${i}!`));
    }

    return HomeActions.dashboardLoaded({companies});
  };
}
