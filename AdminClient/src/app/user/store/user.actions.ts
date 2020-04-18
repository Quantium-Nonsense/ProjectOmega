import { createAction } from '@ngrx/store';

export const beginLoadingUserPage = createAction(
  '[User - Page] Prepare the page to indicate loading'
);
