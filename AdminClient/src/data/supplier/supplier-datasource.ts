import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// TODO: Replace this with your own data model type
export interface Supplier {
  id: number,
  name: string,
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: Supplier[] = [
  {id: 1, name: 'Carex'},
  {id: 2, name: 'GSK'},
  {id: 2, name: 'GSK'},
  {id: 3, name: 'Perrier'},
  {id: 4, name: 'GenericBrand'},
];

/**
 * Data source for the Suppliers view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class SuppliersDataSource extends DataSource<Supplier> {
  private static instance: SuppliersDataSource = null;

  data: Supplier[] = EXAMPLE_DATA;
  observedData: BehaviorSubject<Supplier[]> = new BehaviorSubject<Supplier[]>(this.data);
  paginator: MatPaginator;
  sort: MatSort;

  private constructor() {
    super();
  }

  public static getInstance(): SuppliersDataSource {
    if (SuppliersDataSource.instance === null) {
      SuppliersDataSource.instance = new SuppliersDataSource();
    }

    return this.instance;
  }

  /* In lieu of backend */
  public deleteById(id: number): void {
    const index: number = this.data.findIndex((element) => element.id === id);
    this.data.splice(index, 1);
    this.updateData(this.data);
  }

  public getItemById(id: number): Supplier {
    return this.data.filter(element => element.id === id)[0];
  }

  public addItem(item: Supplier): void {
    this.data.push(item);
    this.updateData(this.data);
  }

  public updateItem(item: Supplier): void {
    const index: number = this.data.findIndex((element) => element.id === item.id);
    this.data[index] = item;
    this.updateData(this.data);
  }

  public getNextId(): number {
    return this.data[this.data.length - 1].id + 1;
  }

  public getAll(): Supplier[] {
    return EXAMPLE_DATA;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Supplier[]> {
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

  private updateData(data: Supplier[]) {
    this.data = data;
    this.observedData.next(data);
    return data;
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Supplier[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Supplier[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
const compare = (a: string | number, b: string | number, isAsc: boolean) => {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
};
