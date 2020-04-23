import {SupplierModel} from '../../shared/model/supplier/supplier.model';
import {Action, ActionReducer, createReducer, on} from '@ngrx/store';
import * as fromApp from '../../reducers/index';
import * as SupplierActions from './suppliers.actions';

export interface State {
	loading: boolean;
	clients: SupplierModel[];
	focusedClient: SupplierModel
}

const initialState: State = {
	loading: false,
	clients: null,
	focusedClient: null
};


// eslint-disable-next-line no-underscore-dangle
const _clientReducer: ActionReducer<State, Action> = createReducer(
	initialState,
	on(SupplierActions.beginLoadingSuppliers, (prevState: State) => ({
		...prevState,
		loading: true
	})),
	on(SupplierActions.allSuppliersLoaded, (prevState: State, {suppliers}) => ({
		...prevState,
		suppliers
	}))
);

export const clientReducer = (state: State | undefined, action: Action) => _clientReducer(state, action);
