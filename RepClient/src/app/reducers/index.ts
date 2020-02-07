import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

export interface State {

}

export const debug = (reducer: ActionReducer<any>): ActionReducer<any> =>
  (state, action) => {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };

export const reducers: ActionReducerMap<State> = {};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [debug] : [];
