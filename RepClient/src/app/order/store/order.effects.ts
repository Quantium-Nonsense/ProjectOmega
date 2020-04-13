import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { map, take } from 'rxjs/operators';
import { ItemModel } from '../../company/model/item.model';
import * as fromApp from '../../reducers/index';
import { OrderItemModel } from '../../shared/model/order/order-item.model';
import * as OrderActions from './order.actions';
import * as fromOrder from './order.reducer';

@Injectable()
export class OrderEffects {

  addItem$ = createEffect(() => this.actions$.pipe(
    ofType(OrderActions.addItem),
    map((action: (Action & { item: ItemModel })) => this.addToOrder(action.item))
  ));

  removeItems$ = createEffect(() => this.actions$.pipe(
    ofType(OrderActions.removeItem),
    map((action: Action & { item: ItemModel }) => this.removeFromOrder(action.item))
  ));

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.State>
  ) {
  }

  private removeFromOrder(item: ItemModel): Action {
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

        return OrderActions.updateOrderItems({orderItems: updatedOrder});
      }
      // Else if we didnt find the item do nothing
    }
    // In list empty or item not there cases we still do nothing but return the same list

    return OrderActions.updateOrderItems({orderItems: updatedOrder});
  }

  private addToOrder(item: ItemModel): Action {
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

        return OrderActions.updateOrderItems({orderItems: updatedOrder});
      }
      // Else if we didnt find the item append and update
      updatedOrder.push({...item, quantity: 1});

      return OrderActions.updateOrderItems({orderItems: updatedOrder});
    }

    // In both the case that the list is empty or the item is not there
    // We simply want to push the item to the list
    updatedOrder.push({...item, quantity: 1});

    return OrderActions.updateOrderItems({orderItems: updatedOrder});
  }

}
