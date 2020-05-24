import { createAction, props } from '@ngrx/store';
import { ListDisplayDataModel } from '../../shared/component/list-display-bottom-sheet/model/list-display-data.model';
import { ItemModel } from '../../shared/model/company-items/item.model';
import { SupplierModel } from '../../shared/model/home/supplier.model';
import { SortOptionsEnum } from '../../shared/model/sort-options.enum';

export const cleanup = createAction(
    '[Company navigation to any] Leaving Company page'
);

export const loadItemsOfCompany = createAction(
    '[Company - Page] Begin Loading Items of company',
    props<{ company: SupplierModel }>()
);

export const companyPageHasError = createAction(
    '[Company - Page - Effects] Company page has error',
    props<{ error: string }>()
);

export const companySelected = createAction(
    '[Dashboard navigation to Company Pages] Incoming Action Company Selected'
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
    props<{ data: ListDisplayDataModel }>()
);

export const companyChanged = createAction(
    '[Company - Page] Company changed',
    props<{ newCompany: SupplierModel }>()
);
