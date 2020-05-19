import { createAction, props } from '@ngrx/store';
import { SupplierModel } from '../../shared/model/supplier/supplier.model';

export const newSupplierCreateSuccess = createAction(
    '[Suppliers - Effects] New supplier created success'
);

export const newSupplierCreateFailed = createAction(
    '[Suppliers - Effects] Error when created new supplier',
    props<{ error: string }>()
);

export const showErrorMessage = createAction(
    '[Suppliers - Effects] Has error message to show',
    props<{ error: string }>()
);

export const showCreateNewSupplierDialog = createAction(
    '[Suppliers - Component] Show new supplier dialog'
);

export const attemptToCreateNewSupplier = createAction(
    '[Suppliers - Form] Attempt to create new supplier',
    props<{ supplier: SupplierModel }>()
);

export const beginLoadingSuppliers = createAction(
    '[Suppliers - Component] Begin loading all suppliers'
);

export const allSuppliersLoaded = createAction(
    '[Suppliers - Effects] All suppliers Loaded',
    props<{ suppliers: SupplierModel[] }>()
);

export const showEditSupplier = createAction(
    '[Suppliers - Component] Show edit supplier dialog',
    props<{ focusedSupplier: SupplierModel }>()
);

export const showDeleteSupplier = createAction(
    '[Suppliers - Component] Show delete supplier dialog',
    props<{ focusedSupplier: SupplierModel }>()
);

export const editSupplier = createAction(
    '[Suppliers - Effects] Edit supplier',
    props<{ editedSupplier: SupplierModel }>()
);

export const deleteSupplier = createAction(
    '[Suppliers - Effects] Delete supplier'
);

export const editSupplierSuccess = createAction(
    '[Suppliers - Effects] Edit supplier success',
    props<{ suppliers: SupplierModel[] }>()
);

export const deleteSupplierSuccess = createAction(
    '[Suppliers - Effects] Edit supplier success',
    props<{ suppliers: SupplierModel[] }>()
);
