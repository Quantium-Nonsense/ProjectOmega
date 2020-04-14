import { newArray } from '@angular/compiler/src/util';
import { Action, createReducer, createSelector, MemoizedSelector, on } from '@ngrx/store';
import * as fromHome from '../../home/store/home.reducer';
import * as fromApp from '../../reducers/index';
import { ItemModel } from '../../shared/model/company-items/item.model';
import { OrderItemModel } from '../../shared/model/order/order-item.model';
import * as OrderActions from './order.actions';

export interface State {
  items: OrderItemModel[];
}

const initialState: State = {
  items: undefined
};

export const selectOrder = (state: fromApp.State) => state.order;

/**
 * Selector to get all items
 */
export const selectItems = createSelector(
  selectOrder,
  (state: State) => state.items
);

export const selectItemsByCompany = createSelector(
  selectOrder,
  fromHome.selectHome,
  (orderState: State, companyState: fromHome.State) => {
    const itemsByCompanyMap: { companyNames: string[], items: [OrderItemModel[]] } = {
      companyNames: [],
      items: [[]]
    };
    const compNames = companyState.companies.map(c => c.name);

    for (const company of compNames) {
      if (orderState.items.find(i => i.companyId === company)) {
        itemsByCompanyMap.companyNames.push(company);
        itemsByCompanyMap.items[itemsByCompanyMap.companyNames.indexOf(company)] = [...orderState.items.filter(i => i.companyId === company)];
      }
    }

    return itemsByCompanyMap;
  }
);

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
  })),
  on(OrderActions.resetOrder, (prevState: State) => ({
    items: undefined
  }))
);

export const orderReducer = (state: State | undefined, action: Action): State => _orderReducer(state, action);
