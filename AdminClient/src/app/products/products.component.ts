import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { MockProductsAPI } from '../../data/products/products-data';
import { ProductModel } from '../models/products/products.model';
import * as fromApp from '../reducers/index';
import { DeleteDialogComponent } from '../shared/delete-dialog/delete-dialog.component';
import { beginProgressBar } from '../toolbar/store/toolbar.actions';
import { ProductDetailsDialogComponent } from './product-details-dialog/product-details-dialog.component';
import { loadAllProducts } from './store/products.actions';
import { selectAllProducts } from './store/products.reducer';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ProductModel>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['supplier', 'name', 'description', 'price', 'actions'];
  productTable: MatTableDataSource<ProductModel>;

  private subscriptions;

  private productsAPI = MockProductsAPI.getInstance();

  private productsObservable: Observable<ProductModel[]>;

  constructor(
      private store$: Store<fromApp.State>
  ) {
    this.productTable = new MatTableDataSource<ProductModel>([]);
    this.subscriptions = new Subscription();
  }

  ngOnInit() {
    this.store$.dispatch(beginProgressBar());
    this.store$.dispatch(loadAllProducts());

    this.store$.pipe(select(selectAllProducts)).subscribe((products: ProductModel[]) => {
      this.productTable.data = products;
      this.productTable.paginator = this.paginator;

    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  handleFilter = (product: ProductModel, filterValue: string): boolean =>
      product.supplier.companyName.toLowerCase().includes(filterValue)
      || product.name.toLowerCase().includes(filterValue)
      || product.description.toLowerCase().includes(filterValue)
      || product.price.toString().includes(filterValue);
}
