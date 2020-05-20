import { createAction, props } from '@ngrx/store';
import { ProductModel } from '../../models/products/products.model';

export const loadAllProducts = createAction(
    '[Products - Component] Load all products'
);

export const allProductsLoaded = createAction(
    '[Products - Effects] All products have been loaded',
    props<{ products: ProductModel[] }>()
);

export const hasErrorMessage = createAction(
    '[Products - Effects] Has Error message',
    props<{ error: string }>()
);
