import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../models/auth/user.model';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: User;
  errorMessage: string;
  loading: boolean;
  returnUrl: string;
}

const initialState: AuthState = {
  errorMessage: undefined,
  loading: false,
  user: undefined,
  returnUrl: ''
};

const _authReducer = createReducer(
  initialState,
  on(AuthActions.loginRejected, (prevState, {errorMessage}) => ({
      ...prevState,
      errorMessage,
      loading: false,
      returnUrl: ''
    })
  ),
  on(AuthActions.loginAttempt, prevState => ({
    ...prevState,
    errorMessage: undefined,
    loading: true
  })),
  on(AuthActions.loginInitiated, (prevState, {returnUrl}) => ({
    ...prevState,
    returnUrl,
  }))
);

export const authReducer = (state: AuthState | undefined, action: Action): AuthState => _authReducer(state, action);
