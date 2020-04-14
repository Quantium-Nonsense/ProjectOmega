import { createAction, props } from '@ngrx/store';
import { ItemModel } from '../../shared/model/company-items/item.model';
import { SortOptionsEnum } from '../../shared/model/sort-options.enum';

export const cleanup = createAction(
  '[Company navigation to any] Leaving Company page'
);

export const loadItemsOfCompany = createAction(
  '[Company - Page] Begin Loading Items of company',
  props<{ company: string }>()
);

export const companySelected = createAction(
  '[Dashboard navigation to Company Pages] Incoming Action Company Selected',
  props<{ selectedCompany: string }>()
);

export const itemsOfCompanyLoaded = createAction(
  '[Company - Effects] Loaded of items finished successfully',
  props<{ items: ItemModel[] }>()
);

export const sortItems = createAction(
  '[Company - Page - Action with Effect] Sort items',
  props<{ by: SortOptionsEnum, items: ItemModel[] }>()
);

export const updateItems = createAction(
  '[Company - Effects] Items updated',
  props<{ items: ItemModel[] }>()
);

export const showCompaniesBottomSheet = createAction(
  '[Company - Page - UI] User clicked on fab button',
  props<{ companiesNames: string[] }>()
);

export const companyChanged = createAction(
  '[Company - Page] Company changed',
  props<{ newCompany: string }>()
);
