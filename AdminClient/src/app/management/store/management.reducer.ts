import {Action, createReducer, on} from '@ngrx/store';
import { CustomerModel } from '../../models/customers/customer.model'
import { CustomerManagementModel} from '../../models/customers/management/customer-management.model';
import * as ManagementActions from './management.actions'

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
  on(ManagementActions.allClientsLoaded, (prevState: State, {customers, customersReps}) =>
    ({
    ...prevState,
    customers
  })),
  on(
    ManagementActions.editRepresentative,
    (prevState: State) => ({
        ...prevState
    }))
);

export const managementReducer = (state: State | undefined, action: Action) => reducer(state, action);


