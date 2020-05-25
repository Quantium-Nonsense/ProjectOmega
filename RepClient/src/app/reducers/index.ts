import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromCustomer from '../add-customer/store/add-customer.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromCompany from '../company/store/company.reducer';
import * as fromHome from '../home/store/home.reducer';
import * as fromOrder from '../order/store/order.reducer';
import { logger } from '../reducer-logger';
import { getSessionID } from '../session-id';

export interface State {

  auth: fromAuth.State;
  home: fromHome.State;
  company: fromCompany.State;
  order: fromOrder.State;
  addCustomer: fromCustomer.AddCustomerState;
}

export const appReducer: ActionReducerMap<State> = {
  auth: fromAuth.authReducer,
  company: fromCompany.companyReducer,
  home: fromHome.homeReducer,
  order: fromOrder.orderReducer,
  addCustomer: fromCustomer.addCustomerReducer
};

export const debug = (reducer: ActionReducer<any>): ActionReducer<any> =>
  (state, action) => {
  
    logger.info(`Session ID: ${getSessionID()}Current state: `, state);
    logger.info(`Session ID: ${getSessionID()}Action fired: `, action);
    return reducer(state, action);
  };

export const metaReducers: MetaReducer<State>[] = !environment.production ? [debug] : [];
