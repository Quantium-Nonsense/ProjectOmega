import { createAction, props } from '@ngrx/store';
import { SortOptionsEnum } from '../../shared/model/sort-options.enum';
import { ItemModel } from '../model/item.model';

export const loadItemsOfCompany = createAction(
  '[Company - Page] Begin Loading Items of company',
  props<{ company: string }>()
);

export const companySelected = createAction(
  '[Dashboard -> Company Pages] Incoming Action Company Selected',
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

export const triggerCompaniesBottomSheet = createAction(
  '[Company - Page - UI] User clicked on fab button',
  props<{ display: boolean }>()
);
