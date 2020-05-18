import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromCustomers from '../customers/store/customers.reducer';
import * as fromToolbar from '../toolbar/store/toolbar.reducer';
import * as fromUser from '../user/store/user.reducer';
import * as fromSuppliers from '../supplier/store/suppliers.reducer';

export interface State {
  auth: fromAuth.State;
  user: fromUser.State;
  customers: fromCustomers.State;
  toolbar: fromToolbar.State;
  suppliers: fromSuppliers.State;
}

export const appReducer: ActionReducerMap<State> = {
  auth: fromAuth.authReducer,
  user: fromUser.userReducer,
  customers: fromCustomers.customerReducer,
  toolbar: fromToolbar.toolbarReducer,
  suppliers: fromSuppliers.supplierReducer
};

export const debug = (reducer: ActionReducer<any>): ActionReducer<any> =>
	(state, action) => {
		console.log('state', state);
		console.log('action', action);

		return reducer(state, action);
	};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [debug] : [];
