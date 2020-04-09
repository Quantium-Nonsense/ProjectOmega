import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromCompany from '../company/store/company.reducer';
import * as fromHome from '../home/store/home.reducer';

export interface AppState {
  auth: fromAuth.AuthState;
  home: fromHome.HomeState;
  company: fromCompany.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  company: fromCompany.companyReducer,
  home: fromHome.homeReducer
};

export const debug = (reducer: ActionReducer<any>): ActionReducer<any> =>
  (state, action) => {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [debug] : [];
