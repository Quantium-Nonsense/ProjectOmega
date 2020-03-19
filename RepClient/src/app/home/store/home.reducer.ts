import { Action, createReducer, on } from '@ngrx/store';
import { CompanyModel } from '../../models/home/company.model';
import * as HomeActions from './home.actions';

export interface HomeState {
  companies: CompanyModel[];
  loading: boolean;
}

const initialState: HomeState = {
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
      loading: false,
      companies,
    })
  ));

export const homeReducer = (state: HomeState | undefined, action: Action): HomeState => _homeReducer(state, action);
