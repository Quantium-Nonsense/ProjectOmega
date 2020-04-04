import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
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

  getItemsOfSelectedCompany$ = createEffect(() => this.actions$.pipe(
    ofType(CompanyActions.loadItemsOfCompany),
    switchMap(action => of(this.loadItems(action.company)).pipe(delay(2000)))
  ));

  constructor(
    private actions$: Actions,
    private router: Router) {
  }

  /**
   * Creates fake items for company for testing purposes and returns action of type itemsOfCompanyLoaded
   * @param company Name of company
   * @see CompanyActions
   */
  private loadItems = (company: string): Action => {
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

    // Pretend there is a delay to mimic HTTP call before returning complete
    return CompanyActions.itemsOfCompanyLoaded({items: fakeItems});
  };
}
