import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ApiEndpointCreatorService } from '../../services/api-endpoint-creator.service';
import { ListDisplayBottomSheetComponent } from '../../shared/component/list-display-bottom-sheet/list-display-bottom-sheet.component';
import { ListDisplayDataModel } from '../../shared/component/list-display-bottom-sheet/model/list-display-data.model';
import { ItemModel } from '../../shared/model/company-items/item.model';
import { SupplierModel } from '../../shared/model/home/supplier.model';
import { SortOptionsEnum } from '../../shared/model/sort-options.enum';
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
   * When it finishes loading it fires a new action that informs the store items have been loaded
   * and that it should update the state
   * // todo: It should dispatch further action in case of failure
   */
  getItemsOfSelectedCompany$ = createEffect(() => this.actions$.pipe(
      ofType(CompanyActions.loadItemsOfCompany),
      switchMap((action: Action & { company: SupplierModel }) =>
        this.httpGetAllItemsForCompany(action.company).pipe(
            switchMap((products: ItemModel[]) =>
              [
                CompanyActions.itemsOfCompanyLoaded({ items: products })
              ]),
            catchError((error: Error) =>
              [
                CompanyActions.companyPageHasError({ error: error.message })
              ])
        ))
  ));

  hasErrorMessage$ = createEffect(() => this.actions$.pipe(
      ofType(CompanyActions.companyPageHasError),
      map((action: Action & { error: string }) => {
        this.snackBar.open(action.error, null, {
          duration: 3000
        });
      })
  ), { dispatch: false });

  /**
   * Makes the bottom sheep appear so that the user may quickly switch between companies
   */
  showCompaniesOnBottomSheet$ = createEffect(() => this.actions$.pipe(
      ofType(CompanyActions.showCompaniesBottomSheet),
      map(action => this.toggleBottomSheet(action.data))
  ), this.noDispatchConfig);

  /**
   * Sorts the items in the state
   */
  sortItems$ = createEffect(() => this.actions$.pipe(
      ofType(CompanyActions.sortItems),
      map(action => this.sortBy(action.by, action.items))
      )
  );

  constructor(
      private snackBar: MatSnackBar,
      private bottomSheet: MatBottomSheet,
      private actions$: Actions,
      private router: Router,
      private endPoints: ApiEndpointCreatorService,
      private http: HttpClient
  ) {
  }

  httpGetAllItemsForCompany(company: SupplierModel): Observable<ItemModel[]> {
    return this.http.get<ItemModel[]>(this.endPoints.getAllProductsForCompany(company.id));
  }

  /**
   * Sort items by given order
   * @param by How to sort items
   * @param items The items to sort
   */
  sortBy = (by: SortOptionsEnum, items: ItemModel[]): Action => {
    const sortedItems = [...items].sort((itemA, itemB) => itemA.name.localeCompare(itemB.name));

    // If items should be in descending order reverse the list
    if (by === SortOptionsEnum.DESCENDING) {
      sortedItems.reverse();
    }

    return CompanyActions.updateItems({ items: sortedItems });
  };

  toggleBottomSheet(data: ListDisplayDataModel): void {
    this.bottomSheet.dismiss();
    this.bottomSheet.open(ListDisplayBottomSheetComponent, {
      data
    });
  }
}
