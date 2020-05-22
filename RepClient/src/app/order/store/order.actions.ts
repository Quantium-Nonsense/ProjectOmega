import { createAction, props } from '@ngrx/store';
import { ItemModel } from '../../shared/model/company-items/item.model';
import { ClientModel } from '../../shared/model/order/clientModel';
import { OrderProductModel } from '../../shared/model/order/oder-product.model';
import { OrderItemModel } from '../../shared/model/order/order-item.model';

export const loadAllClientsFailed = createAction(
    '[Orders - Effects] failed to load customers',
    props<{ error: string }>()
);

export const resetOrder = createAction(
    '[Toolbar / Order - Page] Reset Order'
);

export const createNewOrderSuccess = createAction(
    '[Order - Effects] Create new order successfully'
);

export const createNewOrderFailed = createAction(
    '[Order - Page] Create new order Failed',
    props<{ error: string }>()
);

export const createNewOrder = createAction(
    '[Order - Page] Create new order',
    props<{ order: OrderProductModel[] }>()
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

export const loadAllClients = createAction(
    '[Order - Page] Load all customers'
);

export const loadAllClientsSuccess = createAction(
    '[Order - Page] Load all customers successfully',
    props<{ clients: ClientModel[] }>()
);
