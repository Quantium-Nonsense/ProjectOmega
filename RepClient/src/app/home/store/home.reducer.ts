import { createReducer, on } from '@ngrx/store';
import { CompanyModel } from '../../models/home/company.model';
import * as AuthActions from './home.actions';

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
  on(AuthActions.beginLoadingDashboard, prevState => ({
    ...prevState,
    loading: true
  }))
);
