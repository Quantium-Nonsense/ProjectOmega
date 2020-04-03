import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { delay, map, switchMap, tap } from 'rxjs/operators';
import { ItemModel } from '../model/item.model';
import * as CompanyActions from './company.actions';

@Injectable()
export class CompanyEffects {
  noDispatchConfig = {
    dispatch: false
  };

  redirectToCompanyPage$ = createEffect(() => this.actions$.pipe(
    ofType(CompanyActions.companySelected),
    map(action => this.router.navigateByUrl('/company'))
  ), this.noDispatchConfig);

  constructor(
    private actions$: Actions,
    private router: Router) {
  }

  /*
    getSelectedCompanysItemsAndRedirect$ = createEffect(() => this.actions$.pipe(
      ofType(CompanyActions.companySelected),
      switchMap(action => of(this.loadItems(action.selectedCompany))
        .pipe(tap(() => this.redirectToDisplayItems())))
    ), this.noDispatchConfig);



    private loadItems(company: string) {
      // Fake http request
      const fakeItems: ItemModel[] = [];

      for (let i = 0; i < 15; i++) {
        fakeItems.push(new ItemModel(
          (Math.random() * 153000).toFixed(0),
          `Magic Item ${i}`,
          `You are now looking at this fantastic piece of magic item ${i}`,
          i * Math.exp(i))
        );
      }

      of(fakeItems).pipe(delay(2000));
    }*/
}
