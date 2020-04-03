import { Action, createReducer, on } from '@ngrx/store';
import * as CompanyActions from './company.actions.js';

export interface State {
  company: string;
  errorMessage: string;
  loading: boolean;
}

const initialState: State = {
  company: undefined,
  errorMessage: undefined,
  loading: false
};

const _companyReducer = createReducer(
  initialState,
  on(CompanyActions.companySelected, (prevState, {selectedCompany}) => ({
    ...prevState,
    company: selectedCompany
  }))
);

export const companyReducer = (state: State | undefined, action: Action): State => _companyReducer(state, action);
