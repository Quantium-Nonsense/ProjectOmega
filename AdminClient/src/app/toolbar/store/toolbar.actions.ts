import { createAction } from '@ngrx/store';

export const beginProgressBar = createAction(
  '[Toolbar] Begin Progress Bar',
);

export const progressBarShownSuccessfully = createAction(
  '[Toolbar] Progress Bar Shown',
);

export const stopProgressBar = createAction(
  '[Toolbar] Stop Progress Bar',
);

export const progressBarHiddenSuccessfully = createAction(
  '[Toolbar] Progress Bar Hidden',
);

export const logoutAttempt = createAction(
  '[Toolbar] Logout Attempt',
);

export const logoutSuccessful = createAction(
  '[Toolbar] Logout Successful',
);
