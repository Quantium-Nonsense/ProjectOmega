import { createAction, props } from '@ngrx/store';

export const loginInitiated = createAction(
    '[Authentication - Guard] Guard began authentication protocol',
    props<{ returnUrl: string }>()
);

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

export const logoutSuccessful = createAction(
    '[Logout] - Success'
);

export const hasError = createAction(
    '[Authentication - Effects - Page] Has error',
    props<{ error: string }>()
);
