import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromCustomers from '../customers/store/customers.reducer';
import * as fromOrders from '../orders/store/order.reducer';
import * as fromProducts from '../products/store/products.reducer';
import { logger } from '../reducerLogger';
import { getSessionID } from '../sessionId';
import * as fromSuppliers from '../supplier/store/suppliers.reducer';
import * as fromToolbar from '../toolbar/store/toolbar.reducer';
import * as fromUser from '../user/store/user.reducer';

export interface State {
  auth: fromAuth.State;
  user: fromUser.State;
  customers: fromCustomers.State;
  toolbar: fromToolbar.State;
  suppliers: fromSuppliers.State;
  products: fromProducts.State;
  orders: fromOrders.State;
}

export const appReducer: ActionReducerMap<State> = {
  auth: fromAuth.authReducer,
  user: fromUser.userReducer,
  customers: fromCustomers.customerReducer,
  toolbar: fromToolbar.toolbarReducer,
  suppliers: fromSuppliers.supplierReducer,
  products: fromProducts.productsReducer,
  orders: fromOrders.orderReducer
};

export const debug = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return (state, action) => {

    logger.info('Session ID: ' + getSessionID() + 'Current state: ', state);
    logger.info('Session ID: ' + getSessionID() + 'Action fired: ', action);

    return reducer(state, action);
  };
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [debug] : [];
