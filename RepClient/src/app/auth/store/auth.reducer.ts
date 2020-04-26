import { Action, createFeatureSelector, createReducer, createSelector, MemoizedSelector, on } from '@ngrx/store';
import * as fromApp from '../../reducers/index';
import { UserModel } from '../../shared/model/auth/user.model';
import * as AuthActions from '../store/auth.actions';

export interface State {
  user: UserModel;
  errorMessage: string;
  loading: boolean;
}

const initialState: State = {
  errorMessage: undefined,
  loading: false,
  user: undefined
};

export const selectAuth: MemoizedSelector<fromApp.State, State> = createFeatureSelector<fromApp.State, State>(
    'auth'
);

export const selectUser: MemoizedSelector<fromApp.State, UserModel> = createSelector(
    selectAuth,
    (state: State) => state.user
);

export const selectErrorMessage: MemoizedSelector<fromApp.State, string> = createSelector(
    selectAuth,
    (state: State) => state.errorMessage
);

export const selectIsLoading: MemoizedSelector<fromApp.State, boolean> = createSelector(
    selectAuth,
    (state: State) => state.loading
);

const _authReducer = createReducer(
    initialState,
    on(AuthActions.loginRejected, (prevState, {errorMessage}) => ({
          ...prevState,
          errorMessage,
          loading: false
        })
    ),
    on(AuthActions.loginAttempt, prevState => ({
      ...prevState,
      errorMessage: undefined,
      loading: true
    }))
);

export const authReducer = (state: State | undefined, action: Action): State => _authReducer(state, action);
