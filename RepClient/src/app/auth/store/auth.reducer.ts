import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../models/auth/user.model';
import * as AuthActions from '../store/auth.actions';

export interface AuthState {
  user: User;
  errorMessage: string;
  loading: boolean;
}

const initialState: AuthState = {
  errorMessage: undefined,
  loading: false,
  user: undefined
};

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

export const authReducer = (state: AuthState | undefined, action: Action): AuthState => _authReducer(state, action);
