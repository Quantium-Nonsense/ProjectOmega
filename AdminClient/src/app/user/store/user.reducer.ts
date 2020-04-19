import { Action, createReducer, createSelector, MemoizedSelector, on } from '@ngrx/store';
import { UserModel } from '../../shared/model/user.model';
import * as UserActions from './user.actions';
import * as fromApp from './../../reducers/index';

export interface State {
  users: UserModel[];
  loading: boolean;
}

export const selectUserState = (state: fromApp.State) => state.user;
export const selectIsLoading: MemoizedSelector<fromApp.State, boolean> = createSelector(
  selectUserState,
  (state: State) => state.loading
);
export const selectUsers: MemoizedSelector<fromApp.State, UserModel[]> = createSelector(
  selectUserState,
  (state: State) => state.users
);

const initialState: State = {
  users: null,
  loading: false
};

// eslint-disable-next-line no-underscore-dangle
const _userReducer = createReducer(
  initialState,
  on(UserActions.beginLoadingUserPage, (prevState: State) => ({
    ...prevState,
    loading: true
  })),
  on(UserActions.usersLoaded, (prevState: State, {users}) => ({
    ...prevState,
    users,
    loading: false
  }))
);

export const userReducer = (state: State | undefined, action: Action) => _userReducer(state, action);
