import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromCompany from '../company/store/company.reducer';
import * as fromHome from '../home/store/home.reducer';
import * as fromOrder from '../order/store/order.reducer';

export interface State {

  auth: fromAuth.State;
  home: fromHome.State;
  company: fromCompany.State;
  order: fromOrder.State;
}


export const appReducer: ActionReducerMap<State> = {
  auth: fromAuth.authReducer,
  company: fromCompany.companyReducer,
  home: fromHome.homeReducer,
  order: fromOrder.orderReducer
};

export const debug = (reducer: ActionReducer<any>): ActionReducer<any> =>
  (state, action) => {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };

export const metaReducers: MetaReducer<State>[] = !environment.production ? [debug] : [];
