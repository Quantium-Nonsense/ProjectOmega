import { Action, createReducer, createSelector, on } from '@ngrx/store';
import * as fromApp from '../../reducers/index';
import { CompanyModel } from '../../shared/model/home/company.model';
import * as HomeActions from './home.actions';

export interface State {
  companies: CompanyModel[];
  errorMessage: string;
  loading: boolean;
}

const initialState: State = {
  companies: undefined,
  errorMessage: undefined,
  loading: false
};

export const selectHome = (state: fromApp.State) => state.home;

export const selectAllCompaniesNames = createSelector(
    selectHome,
    (state: State) => state.companies.map(c => c.name)
);

const _homeReducer = createReducer<State>(
    initialState,
    on(HomeActions.beginLoadingDashboard, prevState => ({
      ...prevState,
      errorMessage: undefined,
      loading: true
    })),
    on(HomeActions.showCompanies, (prevState, {companies}) => ({
          ...prevState,
          companies
        })
    ),
    on(HomeActions.dashboardCleanUp, prevState => ({
      ...prevState,
      companies: undefined,
      errorMessage: undefined
    })),
    on(HomeActions.dashboardHasError, (prevState: State, {error}: { error: string }) => ({
      ...prevState,
      errorMessage: error
    })),
    on(HomeActions.dashboardDoneLoading, prevState => ({
      ...prevState,
      loading: false
    }))
);

export const homeReducer = (state: State | undefined, action: Action): State => _homeReducer(state, action);
