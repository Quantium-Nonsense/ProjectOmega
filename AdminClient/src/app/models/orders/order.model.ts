import { OrderProductModel } from './oder-product.model';

export class OrderModel {
  constructor(
    public id: number,
    public dateCreated: Date,
    public userId: number,
    public status: string,
    public totalOrderPrice: number,
    public orderProducts: OrderProductModel[]
  ) {
  }
}
