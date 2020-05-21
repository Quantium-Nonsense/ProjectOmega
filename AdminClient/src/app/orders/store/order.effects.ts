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
import { allOrdersLoadedSuccessfully, getAllOrders, getAllOrdersFailed } from './order.actions';

@Injectable()
export class OrderEffects {

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
                stopProgressBar(),
                getAllOrdersFailed({ error: error.message })
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

  httpGetAllOrders(): Observable<OrderModel[]> {
    return this.http.get<OrderModel[]>(this.endPoints.allOrdersEndPoint());
  }
}
