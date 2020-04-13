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
    map((action: (Action & { item: ItemModel })) => this.addOrUpdateItemInOrder(action.item))
  ));

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.State>
  ) {
  }

  private addOrUpdateItemInOrder(item: ItemModel): Action {
    const updatedOrder: OrderItemModel[] = [];
    let currentState;
    this.store.select('order').pipe(take(1)).subscribe((state: fromOrder.State) => { // Synchronously get last state
      currentState = state;
    });

    debugger;
    if (currentState.items) { // if there are items in state check if the update we want to update exists

      const orderToUpdate = [..._.cloneDeep(currentState.items)]; // Never mutate state
      const lookupItem = orderToUpdate.find(i => i.id === item.id); // Check if our item is there

      if (lookupItem) { // If we have an item add to quantity
        lookupItem.quantity += 1;

        return OrderActions.updateOrderItems({orderItems: orderToUpdate});
      }
    }

    // In both the case that the list is empty or the item is not there
    // We simply want to push the item to the list
    updatedOrder.push({...item, quantity: 1});

    return OrderActions.updateOrderItems({orderItems: updatedOrder});
  }

}
