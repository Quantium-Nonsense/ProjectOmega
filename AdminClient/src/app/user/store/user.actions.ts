import { createAction, props } from '@ngrx/store';
import { UserModel } from '../../shared/model/user.model';

export const beginLoadingUserPage = createAction(
  '[User - Page] Prepare the page to indicate loading'
);

export const loadAllUsers = createAction(
  '[User - Effect] Fire action to load all users'
);

export const usersLoaded = createAction(
  '[User - Effect] Users loaded',
  props<{users: UserModel[]}>()
);
