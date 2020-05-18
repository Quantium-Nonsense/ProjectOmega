import { Action, createReducer, createSelector, MemoizedSelector, on } from '@ngrx/store';
import * as fromHome from '../../home/store/home.reducer';
import * as fromApp from '../../reducers/index';
import { ItemsByCompanyModel } from '../../shared/model/order/items-by-company.model';
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

export const selectItemsByCompany: MemoizedSelector<fromApp.State, ItemsByCompanyModel[]> = createSelector(
  selectOrder,
  fromHome.selectHome,
  (orderState: State, companyState: fromHome.State) => {
    const itemsByCompany: ItemsByCompanyModel[] = [];
    const compNames = companyState.companies ? companyState.companies.map(c => c.companyName) : [];

    for (const company of compNames) {
      const companyInOrder: OrderItemModel = orderState.items
        ? orderState.items.find(i => i.companyId === company)
        : null;
      if (companyInOrder) { // If there are items in order from this company
        // Get the items to add that belong to current company and exist in order
        const itemsToAdd: OrderItemModel[] = [...orderState.items.filter(item => item.companyId.includes(company))];
        if (itemsByCompany) { // if the object array is not empty
          // find the object that belongs to the company in query
          const toAdd: ItemsByCompanyModel = itemsByCompany.find(ibc => ibc.companyName.includes(company));
          if (toAdd) {
            // Assign items in current order to object
            toAdd.companyItems = itemsToAdd;
          } else {
            // If object group has items but no item matches current company
            itemsByCompany.push({companyName: company, companyItems: itemsToAdd});
          }
        } else {
          // if object array has no objects in it yet
          // Add company with items
          itemsByCompany.push({companyItems: itemsToAdd, companyName: company});
        }
      }
    }

    // At the end we return the array of company with associated items in order array

    return itemsByCompany;
  });

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
