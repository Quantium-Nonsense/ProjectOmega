import { Action, createReducer, on } from '@ngrx/store';
import { CompanyModel } from '../../shared/model/home/company.model';
import * as HomeActions from './home.actions';

export interface State {
  companies: CompanyModel[];
  loading: boolean;
}

const initialState: State = {
  companies: undefined,
  loading: false
};

const _homeReducer = createReducer(
  initialState,
  on(HomeActions.beginLoadingDashboard, prevState => ({
    ...prevState,
    loading: true
  })),
  on(HomeActions.dashboardLoaded, (prevState, {companies}) => ({
      ...prevState,
      companies,
      loading: false
    })
  ),
  on(HomeActions.dashboardCleanUp, prevState => ({
    companies: undefined,
    loading: false
  })));

export const homeReducer = (state: State | undefined, action: Action): State => _homeReducer(state, action);
