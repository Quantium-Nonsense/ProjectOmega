import { Action, createReducer, createSelector, MemoizedSelector, on } from '@ngrx/store';
import { UserModel } from '../../shared/model/user.model';
import * as UserActions from './user.actions';
import * as fromApp from './../../reducers/index';

export interface State {
  users: UserModel[];
  loading: boolean;
  focusedUser: UserModel;
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
export const selectFocusedUser:  MemoizedSelector<fromApp.State, UserModel> = createSelector(
  selectUserState,
  (state: State) => state.focusedUser
);

const initialState: State = {
  users: null,
  loading: false,
  focusedUser: null
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
  })),
  on(
    UserActions.showDeleteUserDialog,
    UserActions.showDeleteUserDialog,
    (prevState, {user}) => ({
      ...prevState,
      focusedUser: user
    })),
  on(UserActions.deleteFocusedUser, (prevState: State) => ({
    ...prevState,
    loading: true
  })),
  on(UserActions.userDeleted, (prevState: State, {newUserList}) => ({
    ...prevState,
    loading: false,
    users: newUserList,
    focusedUser: null
  }))
);

export const userReducer = (state: State | undefined, action: Action) => _userReducer(state, action);
