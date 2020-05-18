import { createAction, props } from '@ngrx/store';
import { SupplierModel } from '../../shared/model/supplier/supplier.model';

export const beginLoadingSuppliers = createAction(
	'[Clients - Component] Load all supplier'
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
