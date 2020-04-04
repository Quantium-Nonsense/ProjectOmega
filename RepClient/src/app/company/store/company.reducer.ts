import { Action, createReducer, on } from '@ngrx/store';
import { ItemModel } from '../model/item.model';
import * as CompanyActions from './company.actions.js';

export interface State {
  company: string;
  errorMessage: string;
  loading: boolean;
  companyItems: ItemModel[];
}

const initialState: State = {
  company: undefined,
  companyItems: undefined,
  errorMessage: undefined,
  loading: false
};

const _companyReducer = createReducer(
  initialState,
  on(CompanyActions.companySelected, (prevState, {selectedCompany}) => ({
    ...prevState,
    company: selectedCompany
  })),
  on(CompanyActions.loadItemsOfCompany, (prevState, {company}) => ({
    ...prevState,
    company,
    errorMessage: undefined,
    loading: true
  })),
  on(CompanyActions.itemsOfCompanyLoaded, (prevState, {items}) => ({
    ...prevState,
    companyItems: items,
    errorMessage: undefined,
    loading: false
  }))
);

export const companyReducer = (state: State | undefined, action: Action): State => _companyReducer(state, action);
