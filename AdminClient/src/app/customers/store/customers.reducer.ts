import {CustomerModel} from '../../models/customers/customer.model';
import {Action, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as CustomerActions from './customers.actions';
import * as fromApp from '../../reducers/index';

export interface State {
	loading: boolean,
	customers: CustomerModel[],
	selectedCustomer: CustomerModel
}

const initialState: State = {
	loading: false,
	customers: null,
	selectedCustomer: null
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
export const selectSelectedCustomer = createSelector(
	selectCustomersState,
	(state: State) => state.selectedCustomer
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
	})),
	on(CustomerActions.deleteCustomer, (prevState: State) => ({
		...prevState,
		loading: true
	})),
	on(
		CustomerActions.showDeleteCustomerDialog,
		CustomerActions.showEditCustomerDialog,
		(prevState: State, {customer}) => ({
			...prevState,
			selectedCustomer: customer
		})),
	on(CustomerActions.customerDeletedSuccess, (prevState: State, {newCustomers}) => ({
		...prevState,
		loading: false,
		customers: newCustomers
	}))
);

export const customerReducer = (state: State | undefined, action: Action) => reducer(state, action);
