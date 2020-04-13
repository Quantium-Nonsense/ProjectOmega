import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { CompanyModel } from '../../shared/model/home/company.model';
import * as HomeActions from './home.actions';

@Injectable()
export class HomeEffects {
  dashboardBeginLoading$ = createEffect(() => this.actions$.pipe(
      ofType(HomeActions.beginLoadingDashboard),
      switchMap(
        action => of(this.getDummyCompanies()).pipe(delay(2000))
      )
    )
  );

  constructor(
    private actions$: Actions
  ) {
  }

  /**
   * Fires the action to indicate dashboard has loaded
   */
  getDummyCompanies = (): Action => {
    const companies = this.createDummyCompanies();

    return HomeActions.dashboardLoaded({companies});
  };

  /**
   * Creates 4 dummy companies
   */
  createDummyCompanies = (): CompanyModel[] => {
    const imageUrl = 'assets/shapes.svg';
    const companies: CompanyModel[] = [];

    for (let i = 0; i < 4; i++) {
      companies.push(new CompanyModel(`Company ${i}`, imageUrl, `Some fantastic company called ${i}!`));
    }

    return companies;
  };

}
