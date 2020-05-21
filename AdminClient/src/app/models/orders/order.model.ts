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

  equalsWithoutId(order: OrderModel) {
    return this.dateCreated === order.dateCreated
      && this.userId === order.userId
      && this.status === order.status
      && this.totalOrderPrice === order.totalOrderPrice
      && this.orderProducts
        .map((orderProudct, index) => orderProudct === order.orderProducts[index])
        .reduce((x1, x2) => x1 && x2, true);
  }
}
