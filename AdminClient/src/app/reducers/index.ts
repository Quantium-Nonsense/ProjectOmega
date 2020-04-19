import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromUser from '../user/store/user.reducer';

export interface State {
  auth: fromAuth.State;
  user: fromUser.State;
}

export const appReducer: ActionReducerMap<State> = {
  auth: fromAuth.authReducer,
  user: fromUser.userReducer
};

export const debug = (reducer: ActionReducer<any>): ActionReducer<any> =>
  (state, action) => {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };

export const metaReducers: MetaReducer<State>[] = !environment.production ? [debug] : [];
