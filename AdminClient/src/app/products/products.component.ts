import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { NGXLogger } from 'ngx-logger';
import { Subscription } from 'rxjs';
import { ProductModel } from '../models/products/products.model';
import * as fromApp from '../reducers/index';
import { getSessionID } from '../session-id';
import { beginProgressBar } from '../toolbar/store/toolbar.actions';
import { deleteProduct, getAllProducts, showProductForm } from './store/products.actions';
import { selectAllProducts } from './store/products.reducer';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'description', 'price', 'supplier', 'actions', 'id'];
  productTable: MatTableDataSource<ProductModel>;

  private subscriptions: Subscription;

  constructor(
      private store$: Store<fromApp.State>,
      private logger: NGXLogger,
  ) {
    this.productTable = new MatTableDataSource<ProductModel>([]);
    this.subscriptions = new Subscription();
    this.logger.info(`Session ID: ${getSessionID()} - Constructing products screen`);
  }

  ngOnInit() {
    this.logger.info(`Session ID: ${getSessionID()} - Initializing products screen`);
    this.store$.dispatch(beginProgressBar());
    this.store$.dispatch(getAllProducts());

    this.subscriptions.add(
        this.store$.pipe(select(selectAllProducts)).subscribe((products: ProductModel[]) => {
          this.productTable.data = products;
          this.productTable.sort = this.sort;
          this.productTable.paginator = this.paginator;
          this.logger.info(`Session ID: ${getSessionID()} - Products loaded`);
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.logger.info(`Session ID: ${getSessionID()} - Destroying products screen`);
  }

  handleFilter = (product: ProductModel, filterValue: string): boolean =>
      product.supplier.companyName.toLowerCase().includes(filterValue)
      || product.name.toLowerCase().includes(filterValue)
      || product.description.toLowerCase().includes(filterValue)
      || product.price.toString().includes(filterValue);

  handleCreate(): void {
    this.logger.info(`Session ID: ${getSessionID()} - Opening product create dialog`);
    this.store$.dispatch(showProductForm({ product: null }));
  }


  handleEditDetails(row: ProductModel): void {
    this.logger.info(`Session ID: ${getSessionID()} - Opening product edit dialog`);
    this.store$.dispatch(showProductForm({ product: row }));
  }

  handleDeleteDetails(row: ProductModel): void {
    this.logger.info(`Session ID: ${getSessionID()} - Opening product delete dialog`);
    this.store$.dispatch(beginProgressBar());
    this.store$.dispatch(deleteProduct({ product: row }));
  }
}
