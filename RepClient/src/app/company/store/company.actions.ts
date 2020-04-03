import { createAction, props } from '@ngrx/store';

export const loadItemsOfCompany = createAction(
  '[Company - Page] Begin Loading Items of company',
  props<{ company: string }>()
);

export const companySelected = createAction(
  '[Dashboard -> Company Pages] Incoming Action Company Selected',
  props<{ selectedCompany: string }>()
);
