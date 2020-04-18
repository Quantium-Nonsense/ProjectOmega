import { createAction, props } from '@ngrx/store';
import { ItemModel } from '../../shared/model/company-items/item.model';
import { OrderItemModel } from '../../shared/model/order/order-item.model';

export const resetOrder = createAction(
  '[Toolbar / Order - Page] Reset Order'
);

export const addItem = createAction(
  '[Company Items / Order - Page] Signal and item has been added',
  props<{ item: ItemModel }>()
);

export const updateOrderItems = createAction(
  '[Order Effects] Update the order accordingly',
  props<{ orderItems: OrderItemModel[] }>()
);

export const removeItem = createAction(
  '[Company Items / Order - Page] Signal that item is removed',
  props<{ item: ItemModel }>()
);

export const navigateToConfirmOrder = createAction(
  '[Toolbar - Page] Open order menu'
);
