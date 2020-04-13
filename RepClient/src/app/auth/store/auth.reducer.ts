import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../shared/model/auth/user.model';
import * as AuthActions from '../store/auth.actions';

export interface State {
  user: User;
  errorMessage: string;
  loading: boolean;
}

const initialState: State = {
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

export const authReducer = (state: State | undefined, action: Action): State => _authReducer(state, action);
