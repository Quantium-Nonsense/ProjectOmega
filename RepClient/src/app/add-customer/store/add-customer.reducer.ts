import { Action, createReducer, on } from '@ngrx/store';
import * as AddCustomerActions from '../store/add-customer.actions';

export interface AddCustomerState {
  errorMessage: string;
  loading: boolean;
}

const initialState: AddCustomerState = {
  errorMessage: undefined,
  loading: false
};

const _addCustomerReducer = createReducer(
  initialState,
  on(AddCustomerActions.addRejected, (prevState, {errorMessage}) => ({
      ...prevState,
      errorMessage,
      loading: false
    })
  ),
  on(AddCustomerActions.addAttempt, prevState => ({
    ...prevState,
    errorMessage: undefined,
    loading: true
  }))
);

export const addCustomerReducer = (state: AddCustomerState | undefined, action: Action): AddCustomerState => _addCustomerReducer(state, action);
