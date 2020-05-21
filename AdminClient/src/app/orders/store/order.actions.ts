import { createAction, props } from '@ngrx/store';
import { OrderModel } from '../../models/orders/order.model';

export const getAllOrders = createAction(
    '[Orders - Component] Get all orders'
);

export const getAllOrdersFailed = createAction(
    '[Orders - Effects] Failed to get all orders',
    props<{ error: string }>()
);

export const allOrdersLoadedSuccessfully = createAction(
    '[Orders - Effects] Orders loaded with success',
    props<{ orders: OrderModel[] }>()
);
