import {createAction, props} from '@ngrx/store';
import {CustomerModel} from '../../models/customers/customer.model';

export const beginLoadingCustomers = createAction(
	'[Customers - Component] Load all customers'
);

export const customersLoaded = createAction(
	'[Customers - Effects] All customers loaded',
	props<{customers: CustomerModel[]}>()
);
