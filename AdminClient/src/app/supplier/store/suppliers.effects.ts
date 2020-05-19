import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as fromApp from '../../reducers/index';
import { ApiPathService } from '../../services/api-path.service';
import { PopupDialogComponent } from '../../shared/components/popup-dialog/popup-dialog.component';
import { PopupDialogDataModel } from '../../shared/model/popup-dialog-data.model';
import { SupplierModel } from '../../shared/model/supplier/supplier.model';
import * as ToolbarActions from '../../toolbar/store/toolbar.actions';
import * as fromToolbar from '../../toolbar/store/toolbar.reducer';
import { SupplierFormComponent } from '../supplier-form/supplier-form.component';
import * as SupplierActions from './suppliers.actions';

@Injectable()
export class SuppliersEffects {

  showSupplierCreatedSuccessMessageAndClear$ = createEffect(() => this.actions$.pipe(
      ofType(SupplierActions.newSupplierCreateSuccess),
      map((action: Action) => {
        this.toast.open('New supplier created successfully', null, {
          duration: 3000
        });
        this.dialog.closeAll();
        return SupplierActions.beginLoadingSuppliers();
      })
  ));

  showSupplerFailedToCreateMessage$ = createEffect(() => this.actions$.pipe(
      ofType(SupplierActions.newSupplierCreateFailed),
      map((action: Action & { error: string }) => {
        return SupplierActions.showErrorMessage({ error: action.error });
      })
  ));

  createSupplier$ = createEffect(() => this.actions$.pipe(
      ofType(SupplierActions.attemptToCreateNewSupplier),
      switchMap((action: Action & { supplier: SupplierModel }) => {
        return this.httpCreateNewSupplier(action.supplier).pipe(
            switchMap(supplier => {
              return [
                SupplierActions.newSupplierCreateSuccess(),
                ToolbarActions.stopProgressBar()
              ];
            }),
            catchError((error: Error) => {
              return [
                ToolbarActions.stopProgressBar(),
                SupplierActions.newSupplierCreateFailed({ error: error.message })
              ];
            })
        );
      })
  ));

  deleteSupplierSucess$ = createEffect(() => this.actions$.pipe(
      ofType(SupplierActions.deleteSupplierSuccess),
      switchMap(action => {
        this.dialog.closeAll();
        this.toast.open('Supplier deleted successfully!', null, {
          duration: 3000
        });
        return [
          ToolbarActions.beginProgressBar(),
          SupplierActions.beginLoadingSuppliers()
        ];
      })
  ));

  deleteSupplier$ = createEffect(() => this.actions$.pipe(
      ofType(SupplierActions.deleteSupplier),
      switchMap((action: Action & { supplier: SupplierModel }) =>
          this.httpDeleteSupplier(action.supplier.id).pipe(
              switchMap(() => {
                return [
                  ToolbarActions.stopProgressBar(),
                  SupplierActions.deleteSupplierSuccess()
                ];
              }),
              catchError((error) => {
                return [
                  ToolbarActions.stopProgressBar(),
                  SupplierActions.showErrorMessage({ error: error instanceof HttpErrorResponse ? error.message : error })
                ];
              })
          )
      ))
  );

  editSupplier$ = createEffect(() => this.actions$.pipe(
      ofType(SupplierActions.editSupplier),
      switchMap((action: Action & { editedSupplier: SupplierModel }) => {
        return this.httpEditSupplier(action.editedSupplier).pipe(
            switchMap((supplier: SupplierModel) => {
              this.dialog.closeAll();
              return [
                ToolbarActions.stopProgressBar(),
                SupplierActions.editSupplierSuccess(),
                SupplierActions.beginLoadingSuppliers()
              ];
            }),
            catchError(error => {
              this.dialog.closeAll();
              return [
                ToolbarActions.stopProgressBar(),
                SupplierActions.showErrorMessage({ error: error instanceof Error ? error.message : error })
              ];
            })
        );
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
      map((action: Action & { supplier: SupplierModel }) => {
        console.log(action.supplier);
        this.dialog.open<PopupDialogComponent, PopupDialogDataModel>(
            PopupDialogComponent,
            {
              data: {
                title: 'Delete supplier',
                description: 'Are you sure you want to delete this supplier?',
                dialogActions: [
                  {
                    text: 'Confirm',
                    action: () => this.store$.dispatch(SupplierActions.deleteSupplier({ supplier: action.supplier })),
                    color: 'warn'
                  },
                  {
                    text: 'Cancel',
                    action: () => this.dialog.closeAll(),
                    color: 'primary'
                  }
                ],
                isDisabled: this.store$.select(fromToolbar.selectIsVisible)
              }
            }
        );
      })
  ), { dispatch: false });

  showCreateSupplierDialog$ = createEffect(() => this.actions$.pipe(
      ofType(SupplierActions.showCreateNewSupplierDialog),
      map((action: Action) => {
        this.dialog.open<SupplierFormComponent, {
          formType: 'edit' | 'create',
          supplier: SupplierModel
        }>(SupplierFormComponent,
            {
              width: '66vw',
              height: '66vh',
              panelClass: 'customerDialog',
              data: {
                formType: 'create',
                supplier: null
              }
            }
        );
      })
  ), { dispatch: false });

  showEditSupplierDialog$ = createEffect(() => this.actions$.pipe(
      ofType(SupplierActions.showEditSupplier),
      map((action: Action & { supplier: SupplierModel }) => {
        this.dialog.open<SupplierFormComponent, {
          formType: 'edit' | 'create',
          supplier: SupplierModel
        }>(SupplierFormComponent,
            {
              width: '66vw',
              height: '66vh',
              panelClass: 'customerDialog',
              data: {
                supplier: action.supplier,
                formType: 'edit'
              }
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
          catchError(error => {
            return [
              ToolbarActions.stopProgressBar(),
              SupplierActions.showErrorMessage({ error: error instanceof HttpErrorResponse ? error.message : error })
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

  httpCreateNewSupplier(supplier: SupplierModel): Observable<SupplierModel> {
    return this.http.post<SupplierModel>(this.endPoint.createNewSupplierEndPoint, supplier);
  }

  httpGetAllSuppliers(): Observable<SupplierModel[]> {
    return this.http.get<SupplierModel[]>(this.endPoint.allSuppliers);
  };


  httpEditSupplier(editedSupplier: SupplierModel): Observable<SupplierModel> {
    return this.http.put<SupplierModel>(this.endPoint.getEditSupplierEndPoint(+editedSupplier.id), {
      ...editedSupplier
    });
  }

  httpDeleteSupplier(supplierId) {
    return this.http.delete(this.endPoint.getDeleteSupplierEndPoint(supplierId));
  }
}
