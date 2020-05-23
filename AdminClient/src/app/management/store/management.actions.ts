import { createAction, props } from '@ngrx/store';
import { CustomerModel } from '../../models/customers/customer.model';
import { CustomerManagementModel } from '../../models/customers/management/customer-management.model';



/** ngrx Actions that map for the management page, customer model required */
export const getAllClients = createAction(
  '[Management - Component] Load all clients'
);

export const allClientsLoaded = createAction(
  '[Management - Effects] All clients loaded',
  props<{ customers: CustomerModel[] }>()
);

export const editRepresentative = createAction(
  '[Management - Effects] Change representative for customer'
);

export const editRepresentativeSuccess = createAction(
  '[Management - Effects] Edit rep success'
);

export const editRepresentativeFailed = createAction(
  '[Suppliers - Effects] Error when assigning a rep',
  props<{ error: string }>()
);

export const showEditRepresentativeDialog = createAction(
  '[Management - Component] Show edit representative dialog'
);

export const showErrorMessage = createAction(
  '[Management - Effects] Has error message to show',
  props<{ error: string }>()
);
