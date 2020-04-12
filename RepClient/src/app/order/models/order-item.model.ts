import { ItemModel } from '../../company/model/item.model';

export class OrderItemModel {
  constructor(
    public item: ItemModel[],
    public quantity: number
  ) {
  }
}
