import { BehaviorSubject, Observable } from 'rxjs';
import { ProductModel } from '../../app/models/products/products.model';

// TODO: replace this with real data from your application
/* In lieu of backend */
export class MockProductsAPI {
  private static instance: MockProductsAPI;

  private data: ProductModel[] = [
    new ProductModel(1, 'Carex', 1, 'HandWash', 'Mid-Range', 1.5),
    new ProductModel(2, 'GSK', 2, 'Panadol', 'Paracetamol 500mg', 2),
    new ProductModel(3, 'GSK', 2, 'Nurofen', 'Ibuprofen 500mg', 1.75),
    new ProductModel(4, 'GenericBrand', 4, 'Fuckitol', 'Eliminates all fucks given', 5),
    new ProductModel(5, 'GenericBrand', 4, 'Boronaway', 'Do not give to those with ADHD', 4),
    new ProductModel(6, 'Perrier', 3, 'Carbonated Water', 'Fancy water for pretentious pricks', 2.50),
    new ProductModel(7, 'GenericBrand', 4, 'Nitrous Oxide', 'You\'ll laugh your pants off', 10),
    new ProductModel(8, 'GenericBrand', 4, 'Oxygen', 'For when COVID-19 or a loved one takes your breath away', 5),
    new ProductModel(9, 'GenericBrand', 4, 'Fluoride', 'Fancy ingredient used in toothpaste', 1.5),
    new ProductModel(10, 'GenericBrand', 4, 'Neon', 'Colours for the blind', 100),
    new ProductModel(11, 'GenericBrand', 4, 'Sodium Chloride', 'It\'s salt you idiot', 2.46),
    new ProductModel(12, 'GenericBrand', 4, 'Magnesium', 'Generic Magnesium 500mg', 4.00),
    new ProductModel(13, 'GenericBrand', 4, 'Iron', 'I am Iron Man', 4.50),
    new ProductModel(14, 'GenericBrand', 4, 'Silicon', 'Not for your fake boobs', 5.00),
    new ProductModel(15, 'Carex', 1, 'Carex HandWash Antibac', 'Mid-Range', 1.5),
    new ProductModel(16, 'Carex', 1, 'Carex HandWash Antibacterial with Moisturizer', 'Mid-Range', 1.5),
    new ProductModel(17, 'GenericBrand', 4, 'Chlorine', 'Good for Swimming Pools', 10.00),
    new ProductModel(18, 'GenericBrand', 4, 'Paracetamol', 'Paracetamol 500mg tablets', 1.50),
    new ProductModel(19, 'GenericBrand', 4, 'Potassium', 'This does not evaporate', 1000),
    new ProductModel(20, 'GenericBrand', 4, 'Calcium', 'Makes up your bones', 304),
    new ProductModel(21, 'GenericBrand', 4, 'Extra Item', 'Surprise item - who knows what you\'ll get!', 20),
  ];

  private dataObservable: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>(this.data);

  private constructor() {
  }

  public static getInstance() {
    if (!MockProductsAPI.instance) {
      MockProductsAPI.instance = new MockProductsAPI();
    }

    return MockProductsAPI.instance;
  }

  public getAll(): ProductModel[] {
    return this.data;
  }

  public getAllAsObservable(): Observable<ProductModel[]> {
    return this.dataObservable;
  }

  public deleteById(id: number): void {
    const index: number = this.data.findIndex((element) => element.id === id);
    this.data.splice(index, 1);
    this.dataObservable.next(this.data);
  }

  public getItemById(id: number): ProductModel {
    return this.data.find(element => element.id === id);
  }

  public addItem(item: ProductModel): void {
    this.data.push(item);
    this.dataObservable.next(this.data);
  }

  public updateItem(item: ProductModel): void {
    const index: number = this.data.findIndex((element) => element.id === item.id);
    this.data[index] = item;
    this.dataObservable.next(this.data);
  }

  public getNextId(): number {
    return this.data[this.data.length - 1].id + 1;
  }
};
