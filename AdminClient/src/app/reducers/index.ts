import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAuth from '../auth/store/auth.reducer';

export interface AppState {
  auth: fromAuth.AuthState;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer
};

export const debug = (reducer: ActionReducer<any>): ActionReducer<any> =>
  (state, action) => {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [debug] : [];
