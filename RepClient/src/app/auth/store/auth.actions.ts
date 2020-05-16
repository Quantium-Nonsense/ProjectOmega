import { createAction, props } from '@ngrx/store';
import { UserModel } from '../../shared/model/auth/user.model';

export const loginRejected = createAction(
    '[Authentication - Effects] Login rejected',
    props<{ errorMessage: string }>()
);

export const loginAttempt = createAction(
    '[Authentication - Page] Attempting to log in',
    props<{ email: string, password: string }>()
);

export const loginSuccessful = createAction(
    '[Authentication - Page] Successful Authentication',
    props<{ user: UserModel }>()
);

export const showSpinner = createAction(
    '[Authentication - Page] Show spinner'
);

export const hideSpinner = createAction(
    '[Authentication - Page] Hide spinner'
);

export const isLoading = createAction(
    '[Authentication - Page] Page is loading'
);

export const loadingComplete = createAction(
    '[Authentication - Page] Page completed loading'
);
