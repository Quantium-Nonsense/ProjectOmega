import {createAction, props} from '@ngrx/store';
import {SupplierModel} from '../../shared/model/supplier/supplier.model';

export const beginLoadingSuppliers = createAction(
	'[Clients - Component] Load all supplier'
);

export const allSuppliersLoaded = createAction(
	'[Suppliers - Effects] All suppliers Loaded',
	props<{suppliers: SupplierModel[]}>()
)
