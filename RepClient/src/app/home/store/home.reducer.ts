import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as fromApp from '../../reducers/index';
import { SupplierModel } from '../../shared/model/home/supplier.model';
import * as HomeActions from './home.actions';

export interface State {
  companies: SupplierModel[];
  errorMessage: string;
  loading: boolean;
}

const initialState: State = {
  companies: undefined,
  errorMessage: undefined,
  loading: false
};

export const selectHome = createFeatureSelector<fromApp.State, State>('home');
export const selectAllCompanies = createSelector(
    selectHome,
    (state: State) => state.companies
);
export const selectAllCompaniesNames = createSelector(
    selectHome,
    (state: State) => state.companies.map(c => c.companyName)
);
export const selectGetCompanyFromName = createSelector(
    selectHome,
    (state: State, props: { name: string }) => {
      return state.companies.filter(c => c.companyName === props.name);
    }
);

const _homeReducer = createReducer<State>(
    initialState,
    on(HomeActions.beginLoadingDashboard, prevState => ({
      ...prevState,
      errorMessage: undefined,
      loading: true
    })),
    on(HomeActions.showCompanies, (prevState, { companies }) => ({
          ...prevState,
          companies
        })
    ),
    on(HomeActions.dashboardCleanUp, prevState => ({
      ...prevState,
      companies: undefined,
      errorMessage: undefined
    })),
    on(HomeActions.dashboardHasError, (prevState: State, { error }: { error: string }) => ({
      ...prevState,
      errorMessage: error
    })),
    on(HomeActions.dashboardDoneLoading, prevState => ({
      ...prevState,
      loading: false
    }))
);

export const homeReducer = (state: State | undefined, action: Action): State => _homeReducer(state, action);
