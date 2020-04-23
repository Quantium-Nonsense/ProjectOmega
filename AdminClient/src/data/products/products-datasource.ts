import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

// TODO: Replace this with your own data model type
export interface Product {
  id: number,
  supplier: string,
  supplierId: number,
  name: string,
  description: string,
  price: number,
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: Product[] = [
  {id: 1, supplier: 'Carex', supplierId: 1, name: 'HandWash', description: 'Mid-Range', price: 1.5},
  {id: 2, supplier: 'GSK', supplierId: 2, name: 'Panadol', description: 'Paracetamol 500mg', price: 2},
  {id: 3, supplier: 'GSK', supplierId: 2, name: 'Nurofen', description: 'Ibuprofen 500mg', price: 1.75},
  {id: 4, supplier: 'GenericBrand', supplierId: 4, name: 'Fuckitol', description: 'Eliminates all fucks given', price: 5},
  {id: 5, supplier: 'GenericBrand', supplierId: 4, name: 'Boronaway', description: 'Do not give to those with ADHD', price: 4},
  {id: 6, supplier: 'Perrier', supplierId: 3, name: 'Carbonated Water', description: 'Fancy water for pretentious pricks', price: 2.50},
  {id: 7, supplier: 'GenericBrand', supplierId: 4, name: 'Nitrous Oxide', description: 'You\'ll laugh your pants off', price: 10},
  {
    id: 8,
    supplier: 'GenericBrand',
    supplierId: 4,
    name: 'Oxygen',
    description: 'For when COVID-19 or a loved one takes your breath away',
    price: 5
  },
  {id: 9, supplier: 'GenericBrand', supplierId: 4, name: 'Fluoride', description: 'Fancy ingredient used in toothpaste', price: 1.5},
  {id: 10, supplier: 'GenericBrand', supplierId: 4, name: 'Neon', description: 'Colours for the blind', price: 100},
  {id: 11, supplier: 'GenericBrand', supplierId: 4, name: 'Sodium Chloride', description: 'It\'s salt you idiot', price: 2.46},
  {id: 12, supplier: 'GenericBrand', supplierId: 4, name: 'Magnesium', description: 'Generic Magnesium 500mg', price: 4.00},
  {id: 13, supplier: 'GenericBrand', supplierId: 4, name: 'Iron', description: 'I am Iron Man', price: 4.50},
  {id: 14, supplier: 'GenericBrand', supplierId: 4, name: 'Silicon', description: 'Not for your fake boobs', price: 5.00},
  {id: 15, supplier: 'Carex', supplierId: 1, name: 'Carex HandWash Antibac', description: 'Mid-Range', price: 1.5},
  {id: 16, supplier: 'Carex', supplierId: 1, name: 'Carex HandWash Antibacterial with Moisturizer', description: 'Mid-Range', price: 1.5},
  {id: 17, supplier: 'GenericBrand', supplierId: 4, name: 'Chlorine', description: 'Good for Swimming Pools', price: 10.00},
  {id: 18, supplier: 'GenericBrand', supplierId: 4, name: 'Paracetamol', description: 'Paracetamol 500mg tablets', price: 1.50},
  {id: 19, supplier: 'GenericBrand', supplierId: 4, name: 'Potassium', description: 'This does not evaporate', price: 1000},
  {id: 20, supplier: 'GenericBrand', supplierId: 4, name: 'Calcium', description: 'Makes up your bones', price: 304},
  {
    id: 21,
    supplier: 'GenericBrand',
    supplierId: 4,
    name: 'Extra Item',
    description: 'Surprise item - who knows what you\'ll get!',
    price: 20
  }
];

/**
 * Data source for the Products view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ProductsDataSource extends DataSource<Product> {
  private static instance: ProductsDataSource = null;

  data: Product[] = EXAMPLE_DATA;
  observedData: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(this.data);
  paginator: MatPaginator;
  sort: MatSort;

  private constructor() {
    super();
  }

  public static getInstance(): ProductsDataSource {
    if (ProductsDataSource.instance === null) {
      ProductsDataSource.instance = new ProductsDataSource();
    }

    return this.instance;
  }

  public static equalsWithoutId(product1: Product, product2: Product): boolean {
    return (
      product1.supplier === product2.supplier
      && product1.supplierId === product2.supplierId
      && product1.name === product2.name
      && product1.description === product2.description
      && product1.price === product2.price
    );
  }

  /* In lieu of backend */
  public deleteById(id: number): void {
    const index: number = this.data.findIndex((element) => element.id === id);
    this.data.splice(index, 1);
    this.updateData(this.data);
  }

  public getItemById(id: number): Product {
    return this.data.find(element => element.id === id);
  }

  public addItem(item: Product): void {
    this.data.push(item);
    this.updateData(this.data);
  }

  public updateItem(item: Product): void {
    const index: number = this.data.findIndex((element) => element.id === item.id);
    console.log(item);
    console.log(this.data[index]);
    this.data[index] = item;
    console.log(this.data[index]);
    this.updateData(this.data);
  }

  public getNextId(): number {
    return this.data[this.data.length - 1].id + 1;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   *
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Product[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      this.observedData,
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
  }

  private updateData(data: Product[]) {
    this.data = data;
    this.observedData.next(data);
    return data;
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   *
   * @param data
   */
  private getPagedData(data: Product[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   *
   * @param data
   */
  private getSortedData(data: Product[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'supplier':
          return compare(a.supplier, b.supplier, isAsc);
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'description':
          return compare(a.description, b.description, isAsc);
        case 'price':
          return compare(a.price, b.price, isAsc);
        default:
          return 0;
      }
    });
  }
}

/**
 * Simple sort comparator for example ID/Name columns (for client-side sorting).
 *
 * @param a
 * @param b
 * @param isAsc
 */
const compare = (a: string | number, b: string | number, isAsc: boolean) => {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
};
