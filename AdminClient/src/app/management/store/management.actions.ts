import { createAction } from '@ngrx/store';
import { CustomerModel } from '../../models/customers/customer.model';


/** ngrx Actions that map for the management page, customer model required */
export const getAllClients = createAction(
  '[Management - Component] Load all clients'
);

export const editRepresentative = createAction(
  '[Management - Effects] Change representative for customer'
);

export const showEditRepresentativeDialog = createAction(
  '[Management - Component] Show edit representative dialog'
);
