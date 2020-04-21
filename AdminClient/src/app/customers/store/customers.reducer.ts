import {CustomerModel} from '../../models/customers/customer.model';
import {Action, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as CustomerActions from './customers.actions';
import * as fromApp from '../../reducers/index';

export interface State {
	loading: boolean,
	customers: CustomerModel[]
}

const initialState: State = {
	loading: false,
	customers: null
};

export const selectCustomersState = createFeatureSelector<fromApp.State, State>(
	'customers'
);

export const selectIsLoading = createSelector(
	selectCustomersState,
	(state: State) => state.loading
);
export const selectAllCustomers = createSelector(
	selectCustomersState,
	(state: State) => state.customers
);

const reducer = createReducer(
	initialState,
	on(CustomerActions.beginLoadingCustomers, (prevState: State) => ({
		...prevState,
		loading: true
	})),
	on(CustomerActions.customersLoaded, (prevState: State, {customers}) => ({
		...prevState,
		loading: false,
		customers
	}))
);

export const customerReducer = (state: State | undefined, action: Action) => reducer(state, action);
