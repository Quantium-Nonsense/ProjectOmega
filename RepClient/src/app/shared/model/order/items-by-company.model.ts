import { ItemModel } from '../company-items/item.model';
import { OrderItemModel } from './order-item.model';

export interface ItemsByCompanyModel {
  companyName: string;
  companyItems: OrderItemModel | ItemModel;
}
