import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, switchMap } from 'rxjs/operators';
import { ApiEndpointCreatorService } from '../../services/api-endpoint-creator.service';
import { SupplierModel } from '../../shared/model/home/supplier.model';
import * as HomeActions from './home.actions';

@Injectable()
export class HomeEffects {
  dashboardBeginLoading$ = createEffect(() => this.actions$.pipe(
      ofType(HomeActions.beginLoadingDashboard),
      switchMap(
          (action: Action) => this.getAllCompanies().pipe(
              switchMap((companies: SupplierModel[]) =>
                  [HomeActions.showCompanies({companies}), HomeActions.dashboardDoneLoading()]),
              catchError((error: HttpErrorResponse) => {
                return [
                  HomeActions.dashboardDoneLoading(),
                  HomeActions.dashboardHasError({error: error.message})
                ];
              })
          )
      )
      )
  );

  dashboardHasError$ = createEffect(() => this.actions$.pipe(
      ofType(HomeActions.dashboardHasError),
      map((action: Action & { error: string }) => {
        this.snackBar.open(`Something went wrong: ${ action.error }`, null, {
          duration: 3000
        });
      })
  ), {dispatch: false});

  constructor(
      private actions$: Actions,
      private http: HttpClient,
      private endPoints: ApiEndpointCreatorService,
      private snackBar: MatSnackBar
  ) {
  }

  getAllCompanies(): Observable<SupplierModel[]> {
    return this.http.get<SupplierModel[]>(this.endPoints.allCompanies, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  /**
   * Fires the action to indicate dashboard has loaded
   */
  getDummyCompanies = (): Action => {
    const companies = this.createDummyCompanies();

    return HomeActions.showCompanies({companies});
  };

  /**
   * Creates 4 dummy companies
   */
  createDummyCompanies = (): SupplierModel[] => {
    const imageUrl = 'assets/shapes.svg';
    const companies: SupplierModel[] = [];

    for (let i = 0; i < 4; i++) {
      companies.push(new SupplierModel(`Company ${ i }`, imageUrl, `Some fantastic company called ${ i }!`));
    }

    return companies;
  };

}
