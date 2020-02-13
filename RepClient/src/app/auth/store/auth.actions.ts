import { createAction, props } from '@ngrx/store';

export const loginRejected = createAction(
  '[Authentication - Guard] Guard rejected redirect',
  props<{errorMessage: string}>()
);
