import { CustomerModel } from '../customers/customer.model';
import { ProductModel } from '../products/products.model';

export class OrderProductModel {
  constructor(
    public quantity: number,
    public product: ProductModel,
    public client: CustomerModel,
    public totalPrice: number
  ) {
  }

  equalsWithoutId(orderProductModel: OrderProductModel) {
    return this.quantity === orderProductModel.quantity
      && this.totalPrice === orderProductModel.totalPrice;
  }
}
