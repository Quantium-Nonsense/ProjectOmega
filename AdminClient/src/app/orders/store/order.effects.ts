import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { OrderModel } from '../../models/orders/order.model';
import { ApiPathService } from '../../services/api-path.service';
import { stopProgressBar } from '../../toolbar/store/toolbar.actions';
import {
  allOrdersLoadedSuccessfully,
  createNewOrder,
  createNewOrderFailed,
  getAllOrders,
  getAllOrdersFailed,
  updateOrder,
  updateOrderFailed
} from './order.actions';

@Injectable()
export class OrderEffects {

  createNewOrderFailed$ = createEffect(() => this.actions$.pipe(
      ofType(createNewOrderFailed),
      map((action: Action & { error: string }) => {
        this.snackBar.open(action.error, null, {
          duration: 3000
        });
      })
  ), { dispatch: false });

  createNewOrder$ = createEffect(() => this.actions$.pipe(
      ofType(createNewOrder),
      switchMap((action: Action & { order: OrderModel }) => {
        return this.httpCreateNewOrder(action.order).pipe(
            switchMap((order: OrderModel) => {
              this.snackBar.open('Order placed successful!', null, {
                duration: 3000
              });
              return [
                stopProgressBar()
              ];
            }),
            catchError((error: Error) => {
              return [
                stopProgressBar(),
                createNewOrderFailed({ error: error.message })
              ];
            })
        );
      })
  ));

  updateOrderFailed$ = createEffect(() => this.actions$.pipe(
      ofType(updateOrderFailed),
      map((action: Action & { error: string }) => {
        this.snackBar.open(action.error, null, {
          duration: 3000
        });
      })
      ),
      { dispatch: false });

  updateOrder$ = createEffect(() => this.actions$.pipe(
      ofType(updateOrder),
      switchMap((action: Action & { order: OrderModel }) => {
        return this.httpUpdateOrder(action.order).pipe(
            switchMap((order: OrderModel) => {
              return [
                stopProgressBar(),
                getAllOrders()
              ];
            }),
            catchError((error: Error) => {
              return [
                stopProgressBar(),
                updateOrderFailed({ error: error.message })
              ];
            })
        );
      })
  ));

  getAllOrdersFailed$ = createEffect(
      () => this.actions$.pipe(
          ofType(getAllOrdersFailed),
          map((action: Action & { error: string }) => {
            this.snackBar.open(action.error, null, {
              duration: 3000
            });
          })
      ), { dispatch: false }
  );

  getAllOrders$ = createEffect(() => this.actions$.pipe(
      ofType(getAllOrders),
      switchMap((action: Action) => {
        return this.httpGetAllOrders().pipe(
            switchMap((orders: OrderModel[]) => {
              return [
                stopProgressBar(),
                allOrdersLoadedSuccessfully({ orders })
              ];
            }),
            catchError((error: Error) => {
              return [
                getAllOrdersFailed({ error: error.message }),
                stopProgressBar()
              ];
            })
        );
      })
  ));

  showErrorMessage$ = createEffect(() => this.actions$.pipe(
      ofType(getAllOrdersFailed),
      map((action: Action & { error: string }) => {
        this.snackBar.open(action.error, null, {
          duration: 3000
        });
      })
  ), { dispatch: false });

  constructor(
      private actions$: Actions,
      private http: HttpClient,
      private endPoints: ApiPathService,
      private snackBar: MatSnackBar
  ) {
  }

  httpUpdateOrder(order: OrderModel): Observable<OrderModel> {
    return this.http.put<OrderModel>(this.endPoints.getUpdateOrderEndPoint(order.id), {
      ...order
    });
  }

  httpCreateNewOrder(order: OrderModel): Observable<OrderModel> {
    return this.http.post<OrderModel>(this.endPoints.createNewOrderEndPoint, {
      ...order
    });
  }

  httpGetAllOrders(): Observable<OrderModel[]> {
    return this.http.get<OrderModel[]>(this.endPoints.allOrdersEndPoint());
  }
}
