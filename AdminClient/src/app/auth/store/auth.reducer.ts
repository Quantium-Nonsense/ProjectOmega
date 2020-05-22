import { Action, createReducer, createSelector, on } from '@ngrx/store';
import { User } from '../../models/auth/user.model';
import * as fromApp from '../../reducers/index';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  errorMessage: string;
  loading: boolean;
  returnUrl: string;
}

const initialState: State = {
  errorMessage: null,
  loading: false,
  user: null,
  returnUrl: ''
};

export const selectAuth = (state: fromApp.State) => state.auth;
export const selectIsLoading = createSelector(
    selectAuth,
    (state: State) => state.loading
);
const _authReducer = createReducer(
    initialState,
    on(AuthActions.loginRejected, (prevState, { errorMessage }) => ({
          ...prevState,
          errorMessage,
          loading: false,
          returnUrl: ''
        })
    ),
    on(AuthActions.loginAttempt, prevState => ({
      ...prevState,
      errorMessage: null,
      loading: true
    })),
    on(AuthActions.loginInitiated, (prevState, { returnUrl }) => ({
      ...prevState,
      returnUrl
    })),
    on(AuthActions.loginSuccessful, (prevState: State) => ({
      ...prevState,
      loading: false,
      errorMessage: null
    })),
    on(AuthActions.hasError, (prevState: State, { error }: { error: string }) => ({
      ...prevState,
      errorMessage: error
    }))
);

export const authReducer = (state: State | undefined, action: Action): State => _authReducer(state, action);
