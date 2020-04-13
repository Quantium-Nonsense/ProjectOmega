import { Action, createReducer, on } from '@ngrx/store';
import { OrderItemModel } from '../../shared/model/order/order-item.model';
import * as OrderActions from './order.actions';

export interface State {
  items: OrderItemModel[];
}

const initialState: State = {
  items: undefined
};

const _orderReducer = createReducer(
  initialState,
  on(OrderActions.addItem, prevState => ({
    ...prevState
  })),
  on(OrderActions.removeItem, prevState => ({
    ...prevState
  })),
  on(OrderActions.updateOrderItems, (prevState, {orderItems: updatedOrderItems}) => ({
    items: updatedOrderItems
  }))
);

export const orderReducer = (state: State | undefined, action: Action): State => _orderReducer(state, action);
