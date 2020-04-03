import { createAction, props } from '@ngrx/store';

export const companySelected = createAction(
  '[Dashboard -> Company Pages] Incoming Action Company Selected',
  props<{selectedCompany: string}>()
);
