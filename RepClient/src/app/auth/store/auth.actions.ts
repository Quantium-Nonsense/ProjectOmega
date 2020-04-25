import { createAction, props } from '@ngrx/store';
import { UserModel } from '../../shared/model/auth/user.model';

export const loginRejected = createAction(
  '[Authentication - Guard] Guard rejected redirect',
  props<{ errorMessage: string }>()
);

export const loginAttempt = createAction(
  '[Authentication - Page] Attempting to log in',
  props<{ user: UserModel }>()
);

export const loginSuccessful = createAction(
  '[Authentication - Page] Successful Authentication'
);
