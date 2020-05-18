import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { delay, map, switchMap, take, tap } from 'rxjs/operators';
import * as fromApp from '../../reducers/index';
import { PopupDialogComponent } from '../../shared/components/popup-dialog/popup-dialog.component';
import { PopupDialogDataModel } from '../../shared/model/popup-dialog-data.model';
import { SupplierModel } from '../../shared/model/supplier/supplier.model';
import { SupplierFormComponent } from '../supplier-form/supplier-form.component';
import * as SupplierActions from './suppliers.actions';
import * as fromSuppliers from './suppliers.reducer';

@Injectable()
export class SuppliersEffects {
  deleteCustomer$ = createEffect(() => this.actions$.pipe(
      ofType(SupplierActions.deleteSupplier),
      switchMap((action: Action) => of(this.deleteSupplier()).pipe(
          delay(2000),
          tap(() => this.dialog.closeAll())
      ))
  ));

  editSupplier$ = createEffect(() => this.actions$.pipe(
      ofType(SupplierActions.editSupplier),
      switchMap((action: Action & { editedSupplier: SupplierModel }) => {
        return of(this.editCustomer(action.editedSupplier)).pipe(delay(2000));
      })
  ));

  showDeleteSupplierDialog$ = createEffect(() => this.actions$.pipe(
      ofType(SupplierActions.showDeleteSupplier),
      map((action: Action & { focusedSupplier: SupplierModel }) => {
        this.dialog.open<PopupDialogComponent, PopupDialogDataModel>(
            PopupDialogComponent,
            {
              data: {
                title: 'Delete supplier',
                description: 'Are you sure you want to delete this supplier?',
                dialogActions: [
                  {
                    text: 'Confirm',
                    action: () => this.store$.dispatch(SupplierActions.deleteSupplier()),
                    color: 'warn'
                  },
                  {
                    text: 'Cancel',
                    action: () => this.dialog.closeAll(),
                    color: 'primary'
                  }
                ],
                isDisabled: this.store$.select(fromSuppliers.selectIsLoading)
              }
            }
        );
      })
  ), { dispatch: false });

  showEditSupplierDialog$ = createEffect(() => this.actions$.pipe(
      ofType(SupplierActions.showEditSupplier),
      map((action: Action & { focusedSupplier: SupplierModel }) => {
        this.dialog.open<SupplierFormComponent, SupplierModel>(SupplierFormComponent,
            {
              width: '66vw',
              height: '66vh',
              panelClass: 'customerDialog'
            }
        );
      })
  ), { dispatch: false });

  loadAllSuppliers$ = createEffect(() => this.actions$.pipe(
      ofType(SupplierActions.beginLoadingSuppliers),
      switchMap((action: Action) => of(this.loadAllSuppliers()).pipe(delay(2000)))
      )
  );

  constructor(
      private dialog: MatDialog,
      private actions$: Actions,
      private store$: Store<fromApp.State>
  ) {
  }

  createDummySuppliers() {
    const dummySuppliers: SupplierModel[] = [];

    for (let i = 0; i < 50; i++) {
      dummySuppliers.push({
        companyName: `Company ${ i }`,
        contactNumber: `${ i.toString().repeat(9) }`,
        description: `Some amazing company ${ i }`,
        email: `bla${ i }@bla.com`,
        firstName: `first name ${ i }`,
        lastName: `last name ${ i }`,
        id: `${ i }`,
        notes: `look at me i am note ${ i } FEAR ME!`
      });
    }

    return dummySuppliers;
  }

  loadAllSuppliers(): Action {
    const allSuppliers = this.createDummyClients();

    return SupplierActions.allSuppliersLoaded({ suppliers: allSuppliers });
  };

  private editSupplier(editedSupplier: SupplierModel): Action {
    let allSuppliers: SupplierModel[] = [];
    let supplierToEdit: SupplierModel;

    this.store$.select(fromSuppliers.selectFocusedSupplier)
        .pipe(take(1))
        .subscribe(supplier => supplierToEdit = supplier);

    this.store$.select(fromSuppliers.selectAllSuppliers)
        .pipe(take(1))
        .subscribe(suppliers => allSuppliers = [...suppliers]);

    allSuppliers[allSuppliers.findIndex(c => c.id === supplierToEdit.id)] = {
      ...editedSupplier,
      id: supplierToEdit.id
    };

    return SupplierActions.editSupplierSuccess({ suppliers: allSuppliers });
  }

  private deleteSupplier(): Action {
    let currentSupplier: SupplierModel = null;
    let allSuppliers: SupplierModel[] = [];

    this.store$.select(fromSuppliers.selectAllSuppliers)
        .pipe(take(1))
        .subscribe(s => allSuppliers = s);

    this.store$.select(fromSuppliers.selectFocusedSupplier)
        .pipe(take(1))
        .subscribe(supplier => currentSupplier = supplier);

    const suppliers = allSuppliers.filter(customer => customer.id !== currentSupplier.id);

    return SupplierActions.deleteSupplierSuccess({ suppliers });
  }
}
