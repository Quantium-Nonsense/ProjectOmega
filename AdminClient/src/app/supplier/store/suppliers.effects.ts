import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, switchMap, take, tap } from 'rxjs/operators';
import * as fromApp from '../../reducers/index';
import { ApiPathService } from '../../services/api-path.service';
import { PopupDialogComponent } from '../../shared/components/popup-dialog/popup-dialog.component';
import { PopupDialogDataModel } from '../../shared/model/popup-dialog-data.model';
import { SupplierModel } from '../../shared/model/supplier/supplier.model';
import * as ToolbarActions from '../../toolbar/store/toolbar.actions';
import { SupplierFormComponent } from '../supplier-form/supplier-form.component';
import * as SupplierActions from './suppliers.actions';
import * as fromSuppliers from './suppliers.reducer';

@Injectable()
export class SuppliersEffects {
  deleteSupplier$ = createEffect(() => this.actions$.pipe(
      ofType(SupplierActions.deleteSupplier),
      switchMap((action: Action) => of(this.deleteSupplier()).pipe(
          delay(2000),
          tap(() => this.dialog.closeAll())
      ))
  ));

  editSupplier$ = createEffect(() => this.actions$.pipe(
      ofType(SupplierActions.editSupplier),
      switchMap((action: Action & { editedSupplier: SupplierModel }) => {
        return of(this.editSupplier(action.editedSupplier)).pipe(delay(2000));
      })
  ));

  showErrorMessage$ = createEffect(
      () => this.actions$.pipe(
          ofType(SupplierActions.showErrorMessage),
          map((action: Action & { error: string }) => {
            this.toast.open(`An error has occurred: ${ action.error }`, null, {
              duration: 3000
            });
          })
      ), { dispatch: false });

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

  showCreateSupplierDialog$ = createEffect( () => this.actions$.pipe(
      ofType(SupplierActions.createNewSupplier),
      map((action: Action) => {
        this.dialog.open<SupplierFormComponent, SupplierModel>(SupplierFormComponent,
            {
              width: '66vw',
              height: '66vh',
              panelClass: 'customerDialog'
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
      switchMap((action: Action) => this.httpGetAllSuppliers().pipe(
          switchMap(suppliers => [
            SupplierActions.allSuppliersLoaded({ suppliers }),
            ToolbarActions.stopProgressBar()
          ]),
          catchError((error: HttpErrorResponse) => {
            return [
              ToolbarActions.stopProgressBar(),
              SupplierActions.showErrorMessage({ error: error.message })
            ];
          })
      )))
  );

  constructor(
      private dialog: MatDialog,
      private actions$: Actions,
      private http: HttpClient,
      private toast: MatSnackBar,
      private endPoint: ApiPathService,
      private store$: Store<fromApp.State>
  ) {
  }

  httpGetAllSuppliers(): Observable<SupplierModel[]> {
    return this.http.get<SupplierModel[]>(this.endPoint.allSuppliers);
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
