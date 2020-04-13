import { ItemModel } from '../../../company/model/item.model';

export class OrderItemModel extends ItemModel {
  quantity: number;
  constructor(id: string, name: string, description: string, price: number) {
    super(id, name, description, price);
  }
}
