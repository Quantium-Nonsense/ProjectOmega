import { ItemModel } from '../company-items/item.model';
import { ClientModel } from './clientModel';

export class OrderProductModel {
  constructor(
    public quantity: number,
    public product: ItemModel,
    public client: ClientModel
  ) {
  }
}
