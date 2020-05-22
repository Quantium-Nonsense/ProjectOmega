import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CustomerModel } from '../../models/customers/customer.model';
import * as fromApp from '../../reducers/index';
import { ApiPathService } from '../../services/api-path.service';
import { PopupDialogComponent } from '../../shared/components/popup-dialog/popup-dialog.component';
import { PopupDialogDataModel } from '../../shared/model/popup-dialog-data.model';
import * as ToolbarActions from '../../toolbar/store/toolbar.actions';
import { stopProgressBar } from '../../toolbar/store/toolbar.actions';
import { selectIsProgressBarVisible } from '../../toolbar/store/toolbar.reducer';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import * as CustomerActions from './customers.actions';

@Injectable()
export class CustomersEffects {

  editCustomer$ = createEffect(() => this.actions$.pipe(
      ofType(CustomerActions.editCustomer),
      switchMap((action: Action & { editedCustomer: CustomerModel }) => this.httpEditCustomer(action.editedCustomer).pipe(
          tap(() => {
            this.dialog.closeAll();
          }),
          switchMap((customer: CustomerModel) => {
            return [
              CustomerActions.editCustomerSuccess(),
              CustomerActions.getAllCustomers()
            ];
          }),
          catchError((error: Error) => {
            this.snackBar.open(error.message, null, {
              duration: 3000
            });
            return [
              ToolbarActions.stopProgressBar()
            ];
          })
      ))
  ));

  createCustomer$ = createEffect(() => this.actions$.pipe(
      ofType(CustomerActions.createNewCustomer),
      switchMap((action: Action & { customer: CustomerModel }) => {
        return this.httpCreateCustomer(action.customer).pipe(
            tap(() => this.dialog.closeAll()),
            switchMap((customer: CustomerModel) => {
              return [
                CustomerActions.getAllCustomers()
              ];
            }),
            catchError((error: Error) => {
              this.snackBar.open(error.message, null, {
                duration: 3000
              });
              return [
                stopProgressBar()
              ];
            })
        );
      })
  ));

  deleteCustomer$ = createEffect(() => this.actions$.pipe(
      ofType(CustomerActions.deleteCustomer),
      switchMap((action: Action & { customer: CustomerModel }) => this.httpDeleteCustomer(action.customer).pipe(
          tap(() => this.dialog.closeAll()),
          switchMap(() => {
            return [
              CustomerActions.getAllCustomers(),
              CustomerActions.customerDeletedSuccess()
            ];
          }),
          catchError((error: Error) => {
            this.snackBar.open(error.message, null, {
              duration: 3000
            });
            return [
              ToolbarActions.stopProgressBar()
            ];
          })
      ))
  ));

  loadAllCustomers$ = createEffect(() => this.actions$.pipe(
      ofType(CustomerActions.getAllCustomers),
      switchMap((action: Action) => {
        return this.httpGetAllCustomers().pipe(
            switchMap((customers: CustomerModel[]) => {
              return [
                CustomerActions.customersLoaded({ customers }),
                ToolbarActions.stopProgressBar()
              ];
            }),
            catchError((error: Error) => {
              this.snackBar.open(error.message, null, {
                duration: 3000
              });
              return [
                ToolbarActions.stopProgressBar()
              ];
            })
        );
      })
  ));


  showEditCustomerDialog$ = createEffect(() => this.actions$.pipe(
      ofType(CustomerActions.showEditCustomerDialog),
      map((action: Action & { customer: CustomerModel }) => this.dialog.open<CustomerFormComponent>(
          CustomerFormComponent,
          {
            data: {
              customer: action.customer
            },
            width: '66vw',
            height: '66vh',
            panelClass: 'customerDialog'
          }
      ))
  ), { dispatch: false });

  showDeleteCustomerDialog$ = createEffect(() => this.actions$.pipe(
      ofType(CustomerActions.showDeleteCustomerDialog),
      map((action: Action & { customer: CustomerModel }) => this.showDeleteDialog(action.customer))
  ), { dispatch: false });

  constructor(
      private store: Store<fromApp.State>,
      private actions$: Actions,
      public dialog: MatDialog,
      private http: HttpClient,
      private endPoints: ApiPathService,
      private snackBar: MatSnackBar
  ) {
  }

  showDeleteDialog(customer: CustomerModel) {
    this.dialog.open<PopupDialogComponent, PopupDialogDataModel>(PopupDialogComponent, {
      data: {
        isDisabled: this.store.pipe(select(selectIsProgressBarVisible)),
        title: environment.common.DELETE_CUSTOMER_TITLE,
        description: environment.common.DELETE_CUSTOMER_CONFIRM_TEXT,
        dialogActions: [
          {
            color: 'warn',
            text: environment.common.CONFIRMATION_TEXT,
            action: () => {
              this.store.dispatch(ToolbarActions.beginProgressBar());
              this.store.dispatch(CustomerActions.deleteCustomer({ customer }));
            }
          },
          {
            color: 'primary',
            text: environment.common.CANCELLATION_TEXT,
            action: () => this.dialog.closeAll()
          }

        ]
      }
    });
  }

  httpDeleteCustomer(customer: CustomerModel) {
    return this.http.delete(this.endPoints.getDeleteCustomerEndPoint(customer.id));
  }

  httpGetAllCustomers(): Observable<CustomerModel[]> {
    return this.http.get<CustomerModel[]>(this.endPoints.allCustomersEndPoint);
  }

  httpEditCustomer(customer: CustomerModel): Observable<CustomerModel> {
    return this.http.put<CustomerModel>(this.endPoints.getEditCustomerEndPoint(customer.id), {
      ...customer
    });
  }

  httpCreateCustomer(customer: CustomerModel): Observable<CustomerModel> {
    return this.http.post<CustomerModel>(this.endPoints.createCustomerEndPoint, {
      ...customer
    });
  }
}
