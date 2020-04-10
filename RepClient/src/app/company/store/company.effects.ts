import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';
import { SortOptionsEnum } from '../../shared/model/sort-options.enum';
import { ItemModel } from '../model/item.model';
import * as CompanyActions from './company.actions';

@Injectable()
export class CompanyEffects {

  /**
   * This configuration is added when an action should not be dispatched at the end of an effect
   */
  noDispatchConfig = {
    dispatch: false
  };

  /**
   * Interrupts the company selected action.
   * When a company is selected the app should always redirect to the company page to display that companies items
   * No further actions are dispatched
   */
  redirectToCompanyPage$ = createEffect(() => this.actions$.pipe(
    ofType(CompanyActions.companySelected),
    map(action => this.router.navigateByUrl('/company'))
  ), this.noDispatchConfig);

  /**
   * This should trigger when the items of a selected company should be loaded in the store
   * Triggers when a load items of company action was dispatched in the store
   * When it finishes loading it fires a new action that informs the store items have been loaded and that it should update the state
   * // todo: It should dispatch further action in case of failure
   */
  getItemsOfSelectedCompany$ = createEffect(() => this.actions$.pipe(
    ofType(CompanyActions.loadItemsOfCompany),
    switchMap(action => of(this.loadItems(action.company)).pipe(delay(2000)))
  ));

  sortItems$ = createEffect(() => this.actions$.pipe(
    ofType(CompanyActions.sortItems),
    map(action => this.sortBy(action.by, action.items))
    )
  );

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

    /**
     * Used to check sorting
     */
    const randomLetters = ['A', 'B', 'C', 'D', 'E'];

    // A simple inner function to get a random letter from the array
    const getRandomLetter = () =>
      randomLetters[Math.floor(Math.random() * randomLetters.length)];

    for (let i = 0; i < 50; i++) {
      fakeItems.push(new ItemModel(
        (Math.random() * 153000).toFixed(0),
        `Magic Item ${getRandomLetter()}${getRandomLetter()}${getRandomLetter()} ${i} `,
        `You are now looking at this fantastic piece of magic item ${i}`,
        +(i * Math.exp(i)).toString().substr(0, 2))
      );
    }

    return CompanyActions.itemsOfCompanyLoaded({items: fakeItems});
  };

  /**
   * Sort items by given order
   * @param by How to sort items
   * @param items The items to sort
   */
  private sortBy = (by: SortOptionsEnum, items: ItemModel[]): Action => {
    const sortedItems = [...items].sort((itemA, itemB) => itemA.name.localeCompare(itemB.name));

    // If items should be in descending order reverse the list
    if (by === SortOptionsEnum.DESCENDING) {
      sortedItems.reverse();
    }

    return CompanyActions.updateItems({items: sortedItems});
  };
}
