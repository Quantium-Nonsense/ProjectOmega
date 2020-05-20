import { Action, createReducer } from '@ngrx/store';
import * as fromApp from '../../reducers/index';

export interface State {

}

const initialState: State = {};

export const selectProductState = (state: fromApp.State) => state.products;

// eslint-disable-next-line no-underscore-dangle
const _productsReducer = createReducer(
    initialState
)

export const productsReducer = (state: State | undefined, action: Action) => _productsReducer(state, action);
