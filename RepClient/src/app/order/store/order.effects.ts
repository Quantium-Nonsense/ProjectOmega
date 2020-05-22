import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import * as fromApp from '../../reducers/index';
import { ApiEndpointCreatorService } from '../../services/api-endpoint-creator.service';
import { ItemModel } from '../../shared/model/company-items/item.model';
import { ClientModel } from '../../shared/model/order/clientModel';
import { OrderProductModel } from '../../shared/model/order/oder-product.model';
import { OrderItemModel } from '../../shared/model/order/order-item.model';
import * as OrderActions from './order.actions';
import * as fromOrder from './order.reducer';
import { selectItemsByCompany } from './order.reducer';

@Injectable()
export class OrderEffects {

  createNewOrder$ = createEffect(() => this.actions$.pipe(
      ofType(OrderActions.createNewOrder),
      switchMap((action: Action & { order: OrderProductModel[] }) => {
        return this.httpCreateNewOrder(action.order).pipe(
            switchMap(() => {
              this.snackBar.open('Order created!', null, {
                duration: 3000
              });
              return [OrderActions.createNewOrderSuccess()];
            }),
            catchError((error: Error) => {
              return [OrderActions.createNewOrderFailed({ error: error.message })];
            })
        );
      })
  ));

  createNewOrderFailed$ = createEffect(() => this.actions$.pipe(
      ofType(OrderActions.createNewOrderFailed),
      map((action: Action & { error: string }) => {
        this.snackBar.open(action.error, null, {
          duration: 3000
        });
      })
  ), { dispatch: false });

  getAllCustomers$ = createEffect(() => this.actions$.pipe(
      ofType(OrderActions.loadAllClients),
      switchMap((action: Action) => {
        return this.httpGetAllCustomers().pipe(
            switchMap((clients: ClientModel[]) => {
              return [
                OrderActions.loadAllClientsSuccess({ clients })
              ];
            }),
            catchError((error: Error) => {
              return [
                OrderActions.loadAllClientsFailed({ error: error.message })
              ];
            })
        );
      })
  ));

  showErrorMessage$ = createEffect(() => this.actions$.pipe(
      ofType(OrderActions.loadAllClientsFailed)
  ), { dispatch: false });

  resetOrderState$ = createEffect(() => this.actions$.pipe(
      ofType(OrderActions.resetOrder),
      map(action => selectItemsByCompany.release())
  ), { dispatch: false });

  navigateToConfirmationPage$ = createEffect(() => this.actions$.pipe(
      ofType(OrderActions.navigateToConfirmOrder),
      map((action: Action) => {
        this.router.navigateByUrl('/order');
      })
  ), { dispatch: false });

  addItem$ = createEffect(() => this.actions$.pipe(
      ofType(OrderActions.addItem),
      map((action: (Action & { item: ItemModel })) => this.addToOrder(action.item))
  ));

  removeItems$ = createEffect(() => this.actions$.pipe(
      ofType(OrderActions.removeItem),
      map((action: Action & { item: ItemModel }) => this.removeFromOrder(action.item))
  ));

  constructor(
      private router: Router,
      private actions$: Actions,
      private http: HttpClient,
      private endPoints: ApiEndpointCreatorService,
      private snackBar: MatSnackBar,
      private store: Store<fromApp.State>
  ) {
  }

  removeFromOrder(item: ItemModel): Action {
    let updatedOrder: OrderItemModel[] = [];
    let currentState: fromOrder.State;

    this.store.select('order').pipe(take(1)).subscribe((state: fromOrder.State) => { // Synchronously get last state
      currentState = state;
    });

    updatedOrder = [..._.cloneDeep(currentState.items)]; // Never mutate state

    if (currentState.items) {
      const lookupItem: OrderItemModel = updatedOrder.find(i => i.id === item.id); // Check if our item is there

      if (lookupItem) {
        lookupItem.quantity -= 1;
        if (lookupItem.quantity <= 0) { // if quantity 0 or less
          updatedOrder.splice(updatedOrder.indexOf(lookupItem), 1); // Remove item
        }

        return OrderActions.updateOrderItems({ orderItems: updatedOrder });
      }
      // Else if we didnt find the item do nothing
    }
    // In list empty or item not there cases we still do nothing but return the same list

    return OrderActions.updateOrderItems({ orderItems: updatedOrder });
  }

  addToOrder(item: ItemModel): Action {
    let updatedOrder: OrderItemModel[] = [];
    let currentState: fromOrder.State;

    this.store.select('order').pipe(take(1)).subscribe((state: fromOrder.State) => { // Synchronously get last state
      currentState = state;
    });
    if (currentState.items) { // if there are items in state check if the update we want to update exists

      updatedOrder = [..._.cloneDeep(currentState.items)]; // Never mutate state
      const lookupItem: OrderItemModel = updatedOrder.find(i => i.id === item.id); // Check if our item is there

      if (lookupItem) { // If we have an item add to quantity
        lookupItem.quantity += 1;

        return OrderActions.updateOrderItems({ orderItems: updatedOrder });
      }
      // Else if we didnt find the item append and update
      updatedOrder.push({ ...item, quantity: 1 });

      return OrderActions.updateOrderItems({ orderItems: updatedOrder });
    }

    // In both the case that the list is empty or the item is not there
    // We simply want to push the item to the list
    updatedOrder.push({ ...item, quantity: 1 });

    return OrderActions.updateOrderItems({ orderItems: updatedOrder });
  }

  httpCreateNewOrder(order: OrderProductModel[]): Observable<any> {
    console.log(JSON.stringify({orderProducts: order}));
    return this.http.post(this.endPoints.createNewOrderEndPoint, {
      orderProducts: order
    });
  }

  httpGetAllCustomers(): Observable<ClientModel[]> {
    return this.http.get<ClientModel[]>(this.endPoints.allCustomersEndPoint);
  }
}
