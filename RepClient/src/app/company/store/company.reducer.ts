import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as fromApp from '../../reducers/index';
import { ItemModel } from '../../shared/model/company-items/item.model';
import { SupplierModel } from '../../shared/model/home/supplier.model';
import * as CompanyActions from './company.actions.js';

export interface State {
  company: SupplierModel;
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

export const selectCompanyState = createFeatureSelector<fromApp.State, State>('company');
export const selectClickedCompany = createSelector(
    selectCompanyState,
    (state: State) => state.company
);

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
  })),
  on(CompanyActions.updateItems, (prevState, {items}) => ({
    ...prevState,
    companyItems: items
  })),
  on(CompanyActions.companyChanged, (prevState, {newCompany}) => ({
    ...prevState,
    company: newCompany,
    companyItems: undefined
  })),
  on(CompanyActions.cleanup, prevState => ({
    ...initialState
  }))
);

export const companyReducer = (state: State | undefined, action: Action): State => _companyReducer(state, action);
