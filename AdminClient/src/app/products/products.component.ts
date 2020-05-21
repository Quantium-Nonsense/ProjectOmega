import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ProductModel } from '../models/products/products.model';
import * as fromApp from '../reducers/index';
import { beginProgressBar } from '../toolbar/store/toolbar.actions';
import { deleteProduct, loadAllProducts, showProductForm } from './store/products.actions';
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

  private subscriptions;

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
      this.productTable.sort = this.sort;
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

  handleCreate(): void {
    this.store$.dispatch(showProductForm({ product: null }));
  }


  handleEditDetails(row: ProductModel): void {
    this.store$.dispatch(showProductForm({ product: row }));
  }

  handleDeleteDetails(row: ProductModel): void {
    this.store$.dispatch(beginProgressBar());
    this.store$.dispatch(deleteProduct({ product: row }));
  }
}
