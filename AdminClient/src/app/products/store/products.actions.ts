import { createAction, props } from '@ngrx/store';
import { ProductModel } from '../../models/products/products.model';

export const loadAllProducts = createAction(
    '[Products - Component] Load all products'
);

export const deleteProduct = createAction(
    '[Product - Component] delete product',
    props<{ product: ProductModel }>()
);

export const editNewProduct = createAction(
    '[Products - Form] Edit product',
    props<{ product: ProductModel }>()
);

export const allProductsLoaded = createAction(
    '[Products - Effects] All products have been loaded',
    props<{ products: ProductModel[] }>()
);

export const hasErrorMessage = createAction(
    '[Products - Effects] Has Error message',
    props<{ error: string }>()
);

export const showProductForm = createAction(
    '[Products - Component] Show product form',
    props<{ product: ProductModel }>()
);

export const createNewProduct = createAction(
    '[Products - Form] Create new product',
    props<{ product: ProductModel }>()
);
