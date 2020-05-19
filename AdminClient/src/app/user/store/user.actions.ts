import { createAction, props } from '@ngrx/store';
import { UserModel } from '../../shared/model/user/user.model';

export const userSuccessfullyEdited = createAction(
    '[Edit User - Effect] User successfully changed',
    props<{ newUsers: UserModel[] }>()
);

export const editUser = createAction(
    '[Edit User - Component] Edit user',
    props<{ user: UserModel }>()
);

export const userDeleted = createAction(
    '[User - Effect] User deleted',
    props<{ newUserList: UserModel[] }>()
);

export const deleteFocusedUser = createAction(
    '[User - Effect] Delete focused user'
);

export const showEditUserModal = createAction(
    '[User - Page] Show the user edit user modal',
    props<{ user: UserModel }>()
);

export const showDeleteUserDialog = createAction(
    '[User - Page] Show user dialog',
    props<{ user: UserModel }>()
);

export const beginLoadingUserPage = createAction(
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
