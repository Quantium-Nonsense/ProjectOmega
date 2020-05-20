import { Action, createReducer, createSelector, MemoizedSelector, on } from '@ngrx/store';
import { RoleModel } from '../../shared/model/role/role.model';
import { UserModel } from '../../shared/model/user/user.model';
import * as fromApp from './../../reducers/index';
import * as UserActions from './user.actions';

export interface State {
  users: UserModel[];
  roles: RoleModel[];
}

const initialState: State = {
  users: null,
  roles: null
};

export const selectUserState = (state: fromApp.State) => state.user;
export const selectUsers: MemoizedSelector<fromApp.State, UserModel[]> = createSelector(
    selectUserState,
    (state: State) => state.users
);

export const selectRoles: MemoizedSelector<fromApp.State, RoleModel[]> = createSelector(
    selectUserState,
    (state: State) => state.roles
);


// eslint-disable-next-line no-underscore-dangle
const _userReducer = createReducer(
    initialState,
    on(UserActions.beginLoadingUserPage, (prevState: State) => ({
      ...prevState
    })),
    on(UserActions.usersLoaded, (prevState: State, { users }) => ({
      ...prevState,
      users
    })),
    on(UserActions.setAllUserRoles, (prevState: State, { roles }) => ({
      ...prevState,
      roles
    })),
    on(
        UserActions.showDeleteUserDialog,
        UserActions.showDeleteUserDialog,
        (prevState, { user }) => ({
          ...prevState
        })),
    on(UserActions.deleteFocusedUser, (prevState: State) => ({
      ...prevState
    })),
    on(UserActions.userDeleted, (prevState: State, { newUserList }) => ({
      ...prevState,
      users: newUserList
    })),
    on(UserActions.editUser, (prevState: State) => ({
      ...prevState
    })),
    on(UserActions.showEditUserModal, (prevState: State, { user }) => ({
      ...prevState
    })),
    on(UserActions.userSuccessfullyEdited, (prevState, { newUsers }) => ({
      ...prevState,
      users: [...newUsers]
    }))
);

export const userReducer = (state: State | undefined, action: Action) => _userReducer(state, action);
