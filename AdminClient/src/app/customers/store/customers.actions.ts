import {createAction, props} from '@ngrx/store';
import {CustomerModel} from '../../models/customers/customer.model';

export const editCustomer = createAction(
	'[Customers - Effects] Edit selected customer',
	props<{ editedCustomer: CustomerModel }>()
);

export const editCustomerSuccess = createAction(
	'[Customers - Effects] Edit customer successfully',
	props<{ newCustomers: CustomerModel[] }>()
);

export const customerDeletedSuccess = createAction(
	'[Customers - Effects] Customer Deleted successfully',
	props<{ newCustomers: CustomerModel[] }>()
);

export const beginLoadingCustomers = createAction(
	'[Customers - Component] Load all customers'
);

export const customersLoaded = createAction(
	'[Customers - Effects] All customers loaded',
	props<{ customers: CustomerModel[] }>()
);

export const showDeleteCustomerDialog = createAction(
	'[Customers - Component] Show delete customer dialog',
	props<{ customer: CustomerModel }>()
);

export const showEditCustomerDialog = createAction(
	'[Customers - Component] Show edit customer dialog',
	props<{ customer: CustomerModel }>()
);

export const deleteCustomer = createAction(
	'[Customer - Effects] Delete selected user'
);
