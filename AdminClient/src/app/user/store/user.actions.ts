import { createAction, props } from '@ngrx/store';
import { RoleModel } from '../../shared/model/role/role.model';
import { UserModel } from '../../shared/model/user/user.model';

export const userSuccessfullyEdited = createAction(
    '[Edit User - Effect] User successfully changed'
);

export const editUser = createAction(
    '[Edit User - Component] Edit user',
    props<{ user: UserModel }>()
);

export const userDeleted = createAction(
    '[User - Effect] User deleted'
);

export const deleteUser = createAction(
    '[User - Effect] Delete focused user',
    props<{ user: UserModel }>()
);

export const getAllUserRoles = createAction(
    '[UserForm - Component] Get all available roles'
);

export const setAllUserRoles = createAction(
    '[User - Effects] Set all roles in state',
    props<{ roles: RoleModel[] }>()
);

export const showEditUserModal = createAction(
    '[User - Page] Show the user edit user modal',
    props<{ user: UserModel }>()
);

export const createNewUser = createAction(
    '[User - Effects] Create new user',
    props<{ user: UserModel }>()
);

export const showDeleteUserDialog = createAction(
    '[User - Page] Show user dialog',
    props<{ user: UserModel }>()
);

export const getAllUsers = createAction(
    '[User - Page] Prepare the page to indicate loading'
);

export const loadAllUsers = createAction(
    '[User - Effect] Fire action to load all users'
);

export const usersLoaded = createAction(
    '[User - Effect] Users loaded',
    props<{ users: UserModel[] }>()
);

export const hasErrorMessage = createAction(
    '[User - Effects] There was an error in user effects',
    props<{ error: string }>()
);
