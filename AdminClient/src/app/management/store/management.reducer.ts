import {Action, createReducer, on} from '@ngrx/store';
import { CustomerModel } from '../../models/customers/customer.model'
import { CustomerManagementModel} from '../../models/customers/management/customer-management.model';
import * as ManagementActions from './management.actions'
import * as CustomerActions from '../../customers/store/customers.actions';

export interface State {
  customers: CustomerModel[],
  customersReps: CustomerManagementModel[],
}

const initialState: State = {
  customers: null,
  customersReps: null
};

const reducer = createReducer(initialState,
  on(ManagementActions.getAllClients, (prevState: State) => ({
    ...prevState
  })),
  on(ManagementActions.allClientsLoaded, (prevState: State, {customers}) => ({
    ...prevState,
    customers
  })),
);

export const managementReducer = (state: State | undefined, action: Action) => reducer(state, action);


