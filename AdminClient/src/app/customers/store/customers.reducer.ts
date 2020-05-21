import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { CustomerModel } from '../../models/customers/customer.model';
import * as fromApp from '../../reducers/index';
import * as CustomerActions from './customers.actions';

export interface State {
	customers: CustomerModel[],
}

const initialState: State = {
	customers: null
};

export const selectCustomersState = createFeatureSelector<fromApp.State, State>(
		'customers'
);

export const selectAllCustomers = createSelector(
		selectCustomersState,
		(state: State) => state.customers
);


const reducer = createReducer(
		initialState,
		on(CustomerActions.getAllCustomers, (prevState: State) => ({
			...prevState
		})),
		on(CustomerActions.customersLoaded, (prevState: State, { customers }) => ({
			...prevState,
			customers
		})),
		on(
				CustomerActions.deleteCustomer,
				CustomerActions.editCustomer,
				(prevState: State) => ({
					...prevState
				})),
		on(
				CustomerActions.showDeleteCustomerDialog,
				CustomerActions.showEditCustomerDialog,
				(prevState: State, { customer }) => ({
					...prevState
				})),
		on(
				CustomerActions.customerDeletedSuccess,
				CustomerActions.editCustomerSuccess,
				(prevState: State) => ({
					...prevState,
				}))
);

export const customerReducer = (state: State | undefined, action: Action) => reducer(state, action);
