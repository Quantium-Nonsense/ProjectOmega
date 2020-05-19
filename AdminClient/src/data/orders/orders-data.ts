import { BehaviorSubject, Observable } from 'rxjs';
import { CustomerModel } from '../../app/models/customers/customer.model';
import { OrderProductModel } from '../../app/models/orders/oder-product.model';
import { OrderModel } from '../../app/models/orders/order.model';
import { ProductModel } from '../../app/models/products/products.model';
import { MockProductsAPI } from '../products/products-data';

// TODO: replace this with real data from your application
/* In lieu of backend */
export class MockOrdersAPI {
  private static instance: MockOrdersAPI;

  private static productsApi: MockProductsAPI = MockProductsAPI.getInstance();

  private data: OrderModel[] = [
    new OrderModel(
      1,
      new Date(2020, 02, 10, 13, 15, 9),
      1,
      'PLACED',
      4150,
      [
        new OrderProductModel(
          200,
          MockOrdersAPI.productsApi.getItemById(2),
          new CustomerModel(
            1,
            'Company 1',
            1,
            'Amazong client 1',
            'bla1@bla.com',
            'FirstName1',
            'FirstName1',
            'bla and mac bla'
          ),
          400,
        ),

        new OrderProductModel(
          750,
          MockOrdersAPI.productsApi.getItemById(4),
          new CustomerModel(
            1,
            'Company 1',
            1,
            'Amazong client 1',
            'bla1@bla.com',
            'FirstName1',
            'FirstName1',
            'bla and mac bla'
          ),
          3750,
        ),
      ]
    ),
  ];

  private dataObservable: BehaviorSubject<OrderModel[]> = new BehaviorSubject<OrderModel[]>(this.data);

  private constructor() {
  }

  public static getInstance() {
    if (!MockOrdersAPI.instance) {
      MockOrdersAPI.instance = new MockOrdersAPI();
    }

    return MockOrdersAPI.instance;
  }

  public getAll(): OrderModel[] {
    return this.data;
  }

  public getAllAsObservable(): Observable<OrderModel[]> {
    return this.dataObservable;
  }

  public deleteById(id: number): void {
    const index: number = this.data.findIndex((element) => element.id === id);
    this.data.splice(index, 1);
    this.dataObservable.next(this.data);
  }

  public getItemById(id: number): OrderModel {
    return this.data.find(element => element.id === id);
  }

  public addItem(item: OrderModel): void {
    this.data.push(item);
    this.dataObservable.next(this.data);
  }

  public updateItem(item: OrderModel): void {
    const index: number = this.data.findIndex((element) => element.id === item.id);
    this.data[index] = item;
    this.dataObservable.next(this.data);
  }

  public getNextId(): number {
    return this.data[this.data.length - 1].id + 1;
  }
};
