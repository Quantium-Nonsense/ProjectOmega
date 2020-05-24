import {Action, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import { CustomerModel } from '../../models/customers/customer.model'
import { CustomerManagementModel} from '../../models/customers/management/customer-management.model';
import * as ManagementActions from './management.actions'
import * as fromApp from '../../reducers';

export interface State {
  loading: boolean;
  customers: CustomerModel[],
  customersReps: CustomerManagementModel[],
}

const initialState: State = {
  loading: false,
  customers: null,
  customersReps: null
};

export const selectManagementState = createFeatureSelector<fromApp.State, State>(
  'management'
);

export const selectAllCustomers = createSelector(
  selectManagementState,
  (state: State) => state.customers
);

export const selectAllCustomerRepMaps = createSelector(
  selectManagementState,
  (state: State) => state.customersReps
);

const reducer = createReducer(initialState,
  on(ManagementActions.beginLoadingClients, (prevState: State) => ({
    ...prevState
  })),
  on(
    ManagementActions.editRepresentative,
    (prevState: State) => ({
        ...prevState,
      loading: true
    }))
);

export const managementReducer = (state: State | undefined, action: Action) => reducer(state, action);


