import { Action, createReducer, createSelector, on } from '@ngrx/store';
import { ProductModel } from '../../models/products/products.model';
import * as fromApp from '../../reducers/index';
import { allProductsLoaded } from './products.actions';

export interface State {
  products: ProductModel[]
}

const initialState: State = {
  products: null
};

export const selectProductState = (state: fromApp.State) => state.products;
export const selectAllProducts = createSelector(
    selectProductState,
    (state: State) => state.products
);


// eslint-disable-next-line no-underscore-dangle
const _productsReducer = createReducer(
    initialState,
    on(allProductsLoaded, (prevState, { products }) => ({
      ...prevState,
      products
    }))
);

export const productsReducer = (state: State | undefined, action: Action) => _productsReducer(state, action);
