import { createAction, props } from '@ngrx/store';

export const addRejected = createAction(
  '[Add Customer - Guard] Guard rejected redirect',
  props<{ errorMessage: string }>()
);

export const addAttempt = createAction(
  '[Add Customer - Page] Attempting to add',
  props<{ title: string, firstName: string, lastName: string, companyName: string, companyRole: string, companyAddress: string, emailAddress: string, mobileNumber: string }>()
);

export const addSuccessful = createAction(
  '[Add Customer - Page] Successful Adding Customer'
);
