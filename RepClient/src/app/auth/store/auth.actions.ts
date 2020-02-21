import { createAction, props } from '@ngrx/store';

export const loginRejected = createAction(
  '[Authentication - Guard] Guard rejected redirect',
  props<{ errorMessage: string }>()
);

export const loginAttempt = createAction(
  '[Authentication - Page] Attempting to log in',
  props<{ email: string, password: string }>()
);

export const loginSuccessful = createAction(
  '[Authentication - Page] Successful Authentication'
);
