import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { OrderModel } from '../../models/orders/order.model';
import * as fromApp from '../../reducers/index';
import { allOrdersLoadedSuccessfully } from './order.actions';

export interface State {
  orders: OrderModel[]
}

const initialState: State = {
  orders: null
};

export const selectOrderState = createFeatureSelector<fromApp.State, State>(
    'orders'
);

export const selectAllOrders = createSelector(
    selectOrderState,
    (state: State) => state.orders
);

// eslint-disable-next-line no-underscore-dangle
const _orderReducer = createReducer(
    initialState,
    on(allOrdersLoadedSuccessfully, (prevState: State, { orders }) => ({
      ...prevState,
      orders
    }))
);

export const orderReducer = (state: State | undefined, action: Action) => _orderReducer(state, action);
